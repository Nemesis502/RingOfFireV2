import { Component } from '@angular/core';
import { addDoc, collection, DocumentReference, Firestore, onSnapshot } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  game!: Game;
  newGameInfo!: {};

  constructor(private firestore: Firestore, private router: Router) { }

  newGame() {
    this.game = new Game();
    this.startNewGame();
  }

  async startNewGame() {
    await addDoc(this.getGameRef(), this.game.toJson()).then((gameinfo: DocumentReference) => {
      console.log(gameinfo.id);
      this.router.navigateByUrl('/game/' + gameinfo.id);
    });
  }

  getGameRef() {
    return collection(this.firestore, 'games');
  }
}
