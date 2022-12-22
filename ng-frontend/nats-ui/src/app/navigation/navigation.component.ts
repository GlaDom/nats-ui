import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getAllServers } from '../store';
import { LoadAllServers, UpdateShowServerInforamtion, UpdateShowServerMonitoring } from '../store/actions/server.actions';
import { ServerState } from '../store/reducers/server.reducers';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Input() showServerInformation: boolean;
  @Input() showServerMonitoring: boolean;
  servers: string[] = [];
  selectedServer: string = "";

  constructor(
    private store: Store<ServerState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadAllServers)
    this.store.pipe(select(getAllServers)).subscribe(state => {
      this.servers = [];
      for (let i = 0; i <  state.length; i++)  {
        this.servers.push(state[i].name)         
      }
    })
  }

  setShowServerInformation():void {
    if (!this.showServerInformation) (
      this.store.dispatch(new UpdateShowServerInforamtion(!this.showServerInformation))
    )
    if (this.showServerMonitoring) {
      this.store.dispatch(new UpdateShowServerMonitoring(!this.showServerMonitoring))
    }
    this.selectedServer = ""
  }

  onNgModelChange(event) {
    this.store.dispatch(new UpdateShowServerInforamtion(false))
    this.store.dispatch(new UpdateShowServerMonitoring(true))
    console.log(event)
  }

}
