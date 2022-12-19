import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addserverdialog',
  templateUrl: './addserverdialog.component.html',
  styleUrls: ['./addserverdialog.component.css']
})
export class AddserverdialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddserverdialogComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
