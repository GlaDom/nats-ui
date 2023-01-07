import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getAllClients, getAllServers } from '../store';
import { LoadAllClients, LoadAllServers, UpdateSelectedClient, UpdateSelectedServer, UpdateShowClientInformation, UpdateShowClientMonitoring, UpdateShowServerInforamtion, UpdateShowServerMonitoring } from '../store/actions/server.actions';
import { AppState } from '../store/reducers/server.reducers';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Input() showServerInformation: boolean;
  @Input() showServerMonitoring: boolean;
  @Input() showClientInformation: boolean;
  @Input() showClientMonitoring: boolean;
  servers: string[] = [];
  selectedServer: string = "";
  clients: string[] = [];
  selectedClient: string = "";

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadAllServers)
    this.store.dispatch(new LoadAllClients)
    this.store.pipe(select(getAllServers)).subscribe(state => {
      this.servers = [];
      for (let i = 0; i <  state.length; i++)  {
        this.servers.push(state[i].name)         
      }
    })
    this.store.pipe(select(getAllClients)).subscribe(state => {
      this.clients = [];
      for (let i = 0; i <  state.length; i++)  {
        this.clients.push(state[i].name)         
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
    if(this.showClientInformation) {
      this.store.dispatch(new UpdateShowClientInformation(false))
    }
    if(this.showClientMonitoring) {
      this.store.dispatch(new UpdateShowClientMonitoring(false))
    }
    this.selectedServer = "";
  }

  setShowClientInformation():void {
    if(this.showServerInformation) {
      this.store.dispatch(new UpdateShowServerInforamtion(false))
    }
    if(this.showServerMonitoring) {
      this.store.dispatch(new UpdateShowServerMonitoring(false))
    }
    if(this.showClientInformation) {
      this.store.dispatch(new UpdateShowClientInformation(false))
    }
    if(this.showClientMonitoring) {
      this.store.dispatch(new UpdateShowClientMonitoring(false))
    }
    this.store.dispatch(new UpdateShowClientInformation(true))
    this.selectedClient = "";
  }

  onNgServerModelChange(event: string) {
    this.store.dispatch(new UpdateShowServerInforamtion(false))
    this.store.dispatch(new UpdateShowClientMonitoring(false))
    this.store.dispatch(new UpdateShowClientInformation(false))
    this.store.dispatch(new UpdateShowServerMonitoring(true))
    this.store.dispatch(new UpdateSelectedServer(event))
  }

  onNgClientModelChange(event: string) {
    this.store.dispatch(new UpdateShowServerInforamtion(false))
    this.store.dispatch(new UpdateShowServerMonitoring(false))
    this.store.dispatch(new UpdateShowClientInformation(false))
    this.store.dispatch(new UpdateShowClientMonitoring(true))
    this.store.dispatch(new UpdateSelectedClient(event))
  }
}
