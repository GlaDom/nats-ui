import { Action } from '@ngrx/store'
import { Server } from '../models/server'

export enum ActionTypes {
    LoadAllServers = '[Server] Load Servers',

    LoadSingleServer = '[Server] Load Single Server',

    AddServer = '[Server] Add Server',
}

export class LoadAllServers implements Action {
    readonly type = ActionTypes.LoadAllServers
}

export class LoadSingleServer implements Action {
    readonly type = ActionTypes.LoadSingleServer
    constructor(public payload: number) {}
}

export class AddServer implements Action {
    readonly type = ActionTypes.AddServer
    constructor(public payload: Server) {}
}

export type ServerActions = 
    | LoadAllServers
    | LoadSingleServer 
    | AddServer;