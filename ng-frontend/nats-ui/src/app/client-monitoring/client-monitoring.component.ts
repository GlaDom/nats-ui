import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Client } from '../models/client.model';
import { Message } from '../models/message.model';
import { Server } from '../models/server';
import { ClientService } from '../services/client.service';
import { getAllServers, getSelectedClient } from '../store';
import { AppState } from '../store/reducers/server.reducers';

@Component({
  selector: 'app-client-monitoring',
  templateUrl: './client-monitoring.component.html',
  styleUrls: ['./client-monitoring.component.css']
})
export class ClientMonitoringComponent implements OnInit {
  displayedColumns: string[] = ["timestamp", "type", "subject", "message"]
  filters = this.formBuilder.group({
    info: true,
    ping: true,
    pong: true,
    ok: true,
    err: true,
    msg: true
  })
  
  selectedClient: Client;
  selectedServer: Server;
  servers$: Server[];
  messages$ = new MatTableDataSource<Message>();
  destroyed$ = new Subject();
  
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private webSocket: ClientService
  ) {}

  ngOnInit(): void {
    this.store.pipe(select(getSelectedClient)).subscribe(state => {
      this.selectedClient = state
    })
    this.store.pipe(select(getAllServers)).subscribe(state => {
      this.servers$ = state
    })
  }

  changeSelectedServer(event):void {
    for(let i=0; i< this.servers$.length;i++) {
      if(this.servers$[i].name == event) {
        this.selectedServer = this.servers$[i]
      }
    }
  }

  getMessagesForClient() {
    this.webSocket.connect().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(message => {
      console.log(message)
      this.messages$.data.push(message)
      let newData = this.messages$.data
      this.messages$.data = newData
    })
  }
}
