import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { getShowServerInformation, getShowServerMonitoring } from './store';
import { LoadShowServerInformation } from './store/actions/server.actions';
import { ServerState } from './store/reducers/server.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'nats-ui';
  showServerInformation$: boolean;
  showServerMonitoring$: boolean;

  constructor(
    private store: Store<ServerState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadShowServerInformation)
    this.store.select(getShowServerInformation).subscribe(state => {
      this.showServerInformation$ = state
    })
    this.store.select(getShowServerMonitoring).subscribe(state => {
      this.showServerMonitoring$ = state
    })
  }
}
