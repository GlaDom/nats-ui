import { Action } from '@ngrx/store'
import { Server } from '../../models/server'

export enum ActionTypes {
    LoadAllServers = '[Server] Load Servers',
    LoadAllServerNames = '[Server] Load Server Names',

    LoadSingleServer = '[Server] Load Single Server',
    LoadShowServerInformation = '[Server] Load Show Server',

    AddServer = '[Server] Add Server',
    AddServerSuccess = '[Server] Add Server Success',
    AddServerFailure = '[Server] Add Server Failure',
    
    UpdateShowServerInforamtion = '[Server] Update Show Server',
    UpdateShowServerMonitoring = '[Server] Update Show Server Monitoring'
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

export class AddServerSuccess implements Action {
    readonly type = ActionTypes.AddServerSuccess
}

export class AddServerFailure implements Action {
    readonly type = ActionTypes.AddServerFailure 
}

export class LoadShowServerInformation implements Action {
    readonly type = ActionTypes.LoadShowServerInformation
}

export class UpdateShowServerInforamtion implements Action {
    readonly type = ActionTypes.UpdateShowServerInforamtion
    constructor(public payload: boolean) {}
}

export class UpdateShowServerMonitoring implements Action {
    readonly type = ActionTypes.UpdateShowServerMonitoring
    constructor(public payload: boolean) {}
}

export type ServerActions = 
    | LoadAllServers
    | LoadSingleServer 
    | LoadShowServerInformation
    | AddServer
    | AddServerSuccess
    | AddServerFailure
    | UpdateShowServerInforamtion
    | UpdateShowServerMonitoring;