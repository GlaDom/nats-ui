import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Client } from '../models/client.model';

@Component({
  selector: 'app-addclientdialog',
  templateUrl: './addclientdialog.component.html',
  styleUrls: ['./addclientdialog.component.css']
})
export class AddclientdialogComponent {
  newClient: Client;

  constructor(
    private dialogRef: MatDialogRef<AddclientdialogComponent>,
  ) {}

  onNoClick():void {
    this.newClient = {
      name: "",
      serverAddress: ""
    };
    this.dialogRef.close();
  }

  addClient(): void {
    this.dialogRef.close();
  }
}
