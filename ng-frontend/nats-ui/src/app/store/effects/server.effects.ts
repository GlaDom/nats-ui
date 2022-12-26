import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, from, map, switchMap } from "rxjs";
import { Server } from "src/app/models/server";
import { ServerService } from "src/app/services/server.service";
import { ActionTypes, AddServer, AddServerFailure, AddServerSuccess } from "../actions/server.actions";
import { ServerState } from "../reducers/server.reducers";

@Injectable()
export class ServerEffects {
    constructor(
        private actions$: Actions,
        private store: Store<ServerState>,
        private serverService: ServerService
    ) {}

    //Run this code when a AddServer action is dispachted
    addServer$ = createEffect(() => 
        this.actions$.pipe(
            ofType<AddServer>(ActionTypes.AddServer),
            switchMap((action) => 
                from(this.serverService.getStatusOfServer(action.payload, "http://localhost:8080/api/state/server/status")).pipe(
                    map((data) => new AddServerSuccess(data)),
                    catchError(async () => new AddServerFailure())
                ))
        ));
}