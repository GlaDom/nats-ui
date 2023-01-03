import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, from, map, switchMap } from "rxjs";
import { Server } from "src/app/models/server";
import { ServerService } from "src/app/services/server.service";
import { ActionTypes, AddServer, AddServerFailure, AddServerSuccess, DeleteServer, DeleteServerFailure, DeleteServerSuccess, LoadServerMonitoringStats, LoadServerMonitoringStatsFailure, LoadServerMonitoringStatsSuccess } from "../actions/server.actions";
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
                from(this.serverService.addNewServer(action.payload, "http://localhost:8080/api/state/server/new")).pipe(
                    map((data) => new AddServerSuccess(data)),
                    catchError(async () => new AddServerFailure())
                ))
        ));

    getServerMonitoring = createEffect(() => 
        this.actions$.pipe(
            ofType<LoadServerMonitoringStats>(ActionTypes.LoadServerMonitoringStats),
            switchMap((action) => 
                from(this.serverService.getServerMonitoringStats(action.payload, "http://localhost:8080/api/state/server/monitoring")).pipe(
                    map((data) => new LoadServerMonitoringStatsSuccess(data),
                    catchError(async () => new LoadServerMonitoringStatsFailure()))
                ))
        ))

    deleteServer = createEffect(() => 
        this.actions$.pipe(
            ofType<DeleteServer>(ActionTypes.DeleteServer),
            switchMap((action) =>
                from(this.serverService.deleteServer(action.payload, "http://localhost:8080/api/state/server/delete")).pipe(
                    map((data) => new DeleteServerSuccess(data),
                    catchError(async () => new DeleteServerFailure()))
                ))
        ))
}