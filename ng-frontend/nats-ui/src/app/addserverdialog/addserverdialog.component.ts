import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AppState } from '../store/reducers/server.reducers';
import { Store } from '@ngrx/store' 
import { Server } from '../models/server'
import { AddServer } from '../store/actions/server.actions';

@Component({
  selector: 'app-addserverdialog',
  templateUrl: './addserverdialog.component.html',
  styleUrls: ['./addserverdialog.component.css']
})
export class AddserverdialogComponent {
  newServer: Server = {
    connections: 0,
    messagesIn: 0,
    messagesOut: 0,
    bytesIn: 0,
    bytesOut: 0,
    status: 'pending',
  };

  constructor(
    public dialogRef: MatDialogRef<AddserverdialogComponent>,
    private store: Store<AppState>
  ) {}

  onNoClick(): void {
    this.newServer = {}
    this.dialogRef.close();
  }

  addServer(): void {
    this.store.dispatch(new AddServer(this.newServer));
    this.dialogRef.close();
  }
}
