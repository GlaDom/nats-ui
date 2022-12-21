import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Server } from '../models/server';
import { select, Store } from '@ngrx/store'
import { ServerState } from '../store/server.reducers';
import { LoadAllServers } from '../store/server.actions';
import { getAllServers } from '../store/index';

@Component({
  selector: 'app-serverinformation',
  templateUrl: './serverinformation.component.html',
  styleUrls: ['./serverinformation.component.css']
})

export class ServerinformationComponent implements OnInit {
  servers$: Observable<Server[]>;
  displayedColumns: string[] = [
    "name", 
    "hostname", 
    "port", 
    "monitoringPort", 
    "connections", 
    "messagesIn", 
    "messagesOut", 
    "bytesIn", 
    "bytesOut", 
    "status", 
    "operations"
  ]

  constructor(private store: Store<ServerState>) {

  }

  ngOnInit(): void {
    this.store.dispatch(new LoadAllServers)
    this.servers$ = this.store.pipe(select(getAllServers))
  }
}
