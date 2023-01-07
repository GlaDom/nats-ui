import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Client } from '../models/client.model';
import { Server } from '../models/server';
import { getAllServers } from '../store';
import { AddClient, LoadAllServers } from '../store/actions/server.actions';
import { AppState } from '../store/reducers/server.reducers';

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
  servers$: Server[];
  serverNames$: string[] = [];
  selectedServer: string = "";

  constructor(
    private dialogRef: MatDialogRef<AddclientdialogComponent>,
    private store: Store<AppState>
  ) {
    this.store.dispatch(new LoadAllServers)
    this.store.pipe(select(getAllServers)).subscribe(state => {
      this.servers$ = [];
      for (let i = 0; i <  state.length; i++)  {
        this.servers$.push(state[i])
        this.serverNames$.push(state[i].name)         
      }
    })
  }

  changeSelectedServer(serverName): void {
    this.selectedServer = serverName
    for(let i = 0; i< this.servers$.length;i++){
      if(this.servers$[i].name == this.selectedServer) {
        this.newClient.serverAddress = this.servers$[i].host.concat(":", this.servers$[i].port.toString())
      }
    }
  }

  onNoClick():void {
    this.newClient = {
      name: "",
      serverAddress: ""
    };
    this.dialogRef.close();
  }

  addClient(): void {
    this.dialogRef.close();
    this.store.dispatch(new AddClient(this.newClient))
  }
}
