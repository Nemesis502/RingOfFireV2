import { Component } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, addDoc, collection, doc, onSnapshot, setDoc, updateDoc } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';





@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  firestore: Firestore = inject(Firestore);

  pickCardAnimation = false;
  currentCard: string = "";
  game!: Game;
  gameId!: string;
  // unsubGame;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    // this.unsubGame = ;
  }

  ngOnInit(): void {
    this.initGame()
  }

  // ngonDestroy() {
  //   this.unsubGame();
  // }

  initGame() {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.gameId = params['id'];
      return onSnapshot(this.getSingleGameRef(this.gameId), (game) => {
        let uploadedGame = this.setGameObject(game.data())
        this.game.currentPlayer = uploadedGame.currentPlayer;
        this.game.playedCards = uploadedGame.playedCard;
        this.game.players = uploadedGame.players;
        this.game.stack = uploadedGame.stack;
        console.log(this.game);
      })
    })
  }

  newGame() {
    this.game = new Game();
  }


  takecard() {
    if (!this.pickCardAnimation) {
      this.setCard();
      this.pickCardAnimation = true;
      this.game.currentPlayer++
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }

  setCard() {
    let card = this.game.stack.pop();
    if (card != undefined) {
      this.currentCard = card;
    } else {
      card
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
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
    }
  }

  async saveGame() {
    let currentGameRef = this.getSingleGameRef(this.gameId)
    let updateGame = this.game.toJson();
    await updateDoc(currentGameRef, updateGame);
  }
}

