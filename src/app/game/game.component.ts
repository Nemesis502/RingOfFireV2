import { Component } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, addDoc, collection, doc, onSnapshot, setDoc } from '@angular/fire/firestore';
import { inject } from '@angular/core';





@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  pickCardAnimation = false;
  currentCard: string = "";
  game!: Game;

  unsubGame;

  constructor(private firestore: Firestore, public dialog: MatDialog) {
    this.unsubGame = onSnapshot(this.getGameRef(), (list) => {
      list.forEach(element => {
        console.log(this.setGameObject(element.data()));

      })
    })

  }

  ngOnInit(): void {
    this.newGame();
    this.addNewGame();
  }

  newGame() {
    this.game = new Game();
  }

  async addNewGame() {
   let gameinfo = await addDoc(this.getGameRef(), this.game.toJson())
   console.log(gameinfo);
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
      }
    });
  }

  getGameRef() {
    return collection(this.firestore, 'games');
  }

  setGameObject(obj: any) {
      return {
        game: obj.game || "",
      }
  }
}

