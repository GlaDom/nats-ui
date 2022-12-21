import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UpdateShowServerInforamtion } from '../store/actions/server.actions';
import { ServerState } from '../store/reducers/server.reducers';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Input() showServerInformation: boolean;
  servers: string[] = [];

  constructor(
    private store: Store<ServerState>
  ) { }

  ngOnInit(): void {
  }

  setShowServerInformation():void {
    if (!this.showServerInformation) (
      this.store.dispatch(new UpdateShowServerInforamtion(!this.showServerInformation))
    )
  }

}
