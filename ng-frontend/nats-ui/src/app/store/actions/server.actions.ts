import { Action } from '@ngrx/store'
import { Server } from '../../models/server'

export enum ActionTypes {
    LoadAllServers = '[Server] Load Servers',

    LoadSingleServer = '[Server] Load Single Server',
    LoadShowServerInformation = '[Server] Load Show Server',

    AddServer = '[Server] Add Server',
    
    UpdateShowServerInforamtion = '[Server] Update Show Server'
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

export class LoadShowServerInformation implements Action {
    readonly type = ActionTypes.LoadShowServerInformation
}

export class UpdateShowServerInforamtion implements Action {
    readonly type = ActionTypes.UpdateShowServerInforamtion
    constructor(public payload: boolean) {}
}

export type ServerActions = 
    | LoadAllServers
    | LoadSingleServer 
    | LoadShowServerInformation
    | AddServer
    | UpdateShowServerInforamtion;