import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, of, switchMap } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { Message } from '../models/message.model';
import { AppState } from '../store/reducers/server.reducers';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private socket$: WebSocketSubject<Message>;

  constructor(
    private store: Store<AppState>
  ) { }

  connect(hostname: string, port: string): Observable<Message> {
    return of(`http://127.0.0.1:8080/api/state/client/add?hostname=${hostname}&port=${port}`).pipe(
      map(apiUrl => apiUrl.replace("http", "ws")),
      switchMap(wsUrl => {
        if (this.socket$) {
          return this.socket$;
        } else {
          this.socket$ = webSocket(wsUrl);
          return this.socket$
        }
      })
    )
  }

  closeConnection(): void {
    if (this.socket$) {
      this.socket$.complete();
      this.socket$ = null;
    }
  }
  
  ngOnDestroy() {
    this.closeConnection();
  }
}
