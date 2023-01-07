import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Client } from '../models/client.model';
import { getSelectedClient } from '../store';
import { AppState } from '../store/reducers/server.reducers';

@Component({
  selector: 'app-client-monitoring',
  templateUrl: './client-monitoring.component.html',
  styleUrls: ['./client-monitoring.component.css']
})
export class ClientMonitoringComponent implements OnInit {
  messages$: any;
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

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.pipe(select(getSelectedClient)).subscribe(state => {
      this.selectedClient = state
    })
  }
}
