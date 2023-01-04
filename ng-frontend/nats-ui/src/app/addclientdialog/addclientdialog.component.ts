import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Client } from '../models/client.model';
import { Server } from '../models/server';

@Component({
  selector: 'app-addclientdialog',
  templateUrl: './addclientdialog.component.html',
  styleUrls: ['./addclientdialog.component.css']
})
export class AddclientdialogComponent {
  newClient: Client = {
    name: "",
    serverAddress: ""
  };
  servers$: Server[] = [
    {
      name: "test-server",
    },
    {
      name: "test-server2",
    }
  ];

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
