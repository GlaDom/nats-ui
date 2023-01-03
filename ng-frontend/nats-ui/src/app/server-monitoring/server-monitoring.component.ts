import { Component, OnInit } from '@angular/core';
import { ServerMonitoring } from '../models/server-monitoring.model';
import { LoadServerMonitoringStats } from '../store/actions/server.actions';
import { ServerState } from '../store/reducers/server.reducers';
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs';
import { getSelectedServer, getServerMonitoringStats } from '../store';
import { Server } from '../models/server';

@Component({
  selector: 'app-server-monitoring',
  templateUrl: './server-monitoring.component.html',
  styleUrls: ['./server-monitoring.component.css']
})
export class ServerMonitoringComponent implements OnInit {
  serverStats: ServerMonitoring;
  selectedServer$: Server;

  constructor(
    private store: Store<ServerState>
  ) {
    this.serverStats = {
      id: 0,
      name: '',
      host: '',
      port: 0,
      monitoringport: 0,
      varz: null,
      subz: null
    };
  }

  ngOnInit(): void {
    this.store.pipe(select(getSelectedServer)).subscribe(state => 
      this.selectedServer$ = state)
    console.log(this.selectedServer$)
    this.store.dispatch(new LoadServerMonitoringStats(this.selectedServer$))
    this.store.pipe(select(getServerMonitoringStats)).subscribe(state => 
      this.serverStats = state)
  }
}
