import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent implements OnInit{
  name: string = "";
  gender: string = "";

  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>) {}

  ngOnInit(): void {
      
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.name.length > 0 && this.gender) {
      this.dialogRef.close({ name: this.name, gender: this.gender });
    }
  }


}
