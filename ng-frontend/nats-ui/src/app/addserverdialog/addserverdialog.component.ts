import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ServerState } from '../store/server.reducers';
import { Store } from '@ngrx/store' 
import { Server } from '../models/server'
import { AddServer } from '../store/server.actions';

@Component({
  selector: 'app-addserverdialog',
  templateUrl: './addserverdialog.component.html',
  styleUrls: ['./addserverdialog.component.css']
})
export class AddserverdialogComponent {
  testServer: Server = {};
  constructor(
    public dialogRef: MatDialogRef<AddserverdialogComponent>,
    private store: Store<ServerState>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addServer(): void {
    this.testServer = {
      "name": "testServer",
      "hostname": "192.168.178.0.2",
      "port": 4222,
      "monitoringPort": 8222,
      "connections": 3,
      "messagesIn": 34055,
      "messagesOut": 245,
      "bytesIn": 240422,
      "bytesOut": 2404
    }

    console.log("das geht");

    this.store.dispatch(new AddServer(this.testServer));
    this.dialogRef.close();
  }
}
