import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { GameComponent } from './game/game.component';
import { PlayerComponent } from './player/player.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogAddPlayerComponent } from './dialog-add-player/dialog-add-player.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { GameInfoComponent } from './game-info/game-info.component';
import { MatCardModule } from '@angular/material/card';
import { PlayerMobileComponent } from './player-mobile/player-mobile.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';



@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponent,
    GameComponent,
    PlayerComponent,
    DialogAddPlayerComponent,
    GameInfoComponent,
    PlayerMobileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatButtonToggleModule,
    provideFirebaseApp(() => initializeApp({ "projectId": "ring-of-fire-c62f8", "appId": "1:1050611409904:web:9827e35ab204ddd137f335", "databaseURL": "https://ring-of-fire-c62f8-default-rtdb.europe-west1.firebasedatabase.app", "storageBucket": "ring-of-fire-c62f8.firebasestorage.app", "apiKey": "AIzaSyBjmhpxsMLaxjIjUvGNHVUwZWmUC9NjMiA", "authDomain": "ring-of-fire-c62f8.firebaseapp.com", "messagingSenderId": "1050611409904" })),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
