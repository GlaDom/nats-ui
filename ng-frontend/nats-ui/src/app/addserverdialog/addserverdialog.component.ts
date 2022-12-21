import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ServerState } from '../store/server.reducers';
import { Store } from '@ngrx/store' 
import { Server } from '../models/server'
import { AddServer } from '../store/server.actions';
import { ServerinformationComponent } from '../serverinformation/serverinformation.component';

@Component({
  selector: 'app-addserverdialog',
  templateUrl: './addserverdialog.component.html',
  styleUrls: ['./addserverdialog.component.css']
})
export class AddserverdialogComponent {
  newServer: Server = {};

  constructor(
    public dialogRef: MatDialogRef<AddserverdialogComponent>,
    private store: Store<ServerState>
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
