import { Component } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collection, doc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';





@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  firestore: Firestore = inject(Firestore);
  game!: Game;
  gameId!: string;
  gameOver = false;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.initGame()
  }

  initGame() {
    this.newGame();
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      return onSnapshot(this.getSingleGameRef(this.gameId), (game) => {
        let uploadedGame = this.setGameObject(game.data())
        this.game.currentPlayer = uploadedGame.currentPlayer;
        this.game.playedCards = uploadedGame.playedCard;
        this.game.players = uploadedGame.players;
        this.game.stack = uploadedGame.stack;
        this.game.pickCardAnimation = uploadedGame.pickCardAnimation;
        this.game.currentCard = uploadedGame.currentCard;
      })
    })
  }

  newGame() {
    this.game = new Game();
  }


  takecard() {
    if (this.game.stack.length == 0) {
      this.gameOver = true;
    } else if (!this.game.pickCardAnimation) {
      this.setCard();
      this.cardAnimation();
      this.saveGame();
      setTimeout(() => {
        this.secondCardAnimation();
        this.saveGame();
      }, 1000);
    }
  }

  setCard() {
    let card = this.game.stack.pop();
    if (card != undefined) {
      this.game.currentCard = card;
    } else {
      card
    }
  }

  cardAnimation() {
    this.game.pickCardAnimation = true;
    this.game.currentPlayer++
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
  }

  secondCardAnimation() {
    this.game.playedCards.push(this.game.currentCard);
    this.game.pickCardAnimation = false;
  }

  editPlayer(playerId: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change == 'Delete') {
          this.game.players.splice(playerId, 1);
        }
        this.saveGame();
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((player: { name: string; gender: string } | undefined) => {
      if (player && player.name && player.name.length > 0 && player.gender) {
        this.game.players.push(player);
        this.saveGame();
      }
    });
  }


  getSingleGameRef(params: string) {
    return doc(collection(this.firestore, 'games'), params);
  }

  setGameObject(obj: any) {
    return {
      currentPlayer: obj.currentPlayer || 0,
      playedCard: obj.playedCards || [],
      players: obj.players || [],
      stack: obj.stack || [],
      pickCardAnimation: obj.pickCardAnimation || false,
      currentCard: obj.currentCard || ""
    }
  }

  async saveGame() {
    let currentGameRef = this.getSingleGameRef(this.gameId)
    let updateGame = this.game.toJson();
    await updateDoc(currentGameRef, updateGame);
  }
}

