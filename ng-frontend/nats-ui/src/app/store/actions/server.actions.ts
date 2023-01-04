import { Action } from '@ngrx/store'
import { ServerMonitoring } from 'src/app/models/server-monitoring.model'
import { Server } from '../../models/server'

export enum ActionTypes {
    //App actions
    UpdateShowServerInforamtion = '[Server] Update Show Server',
    UpdateShowServerMonitoring = '[Server] Update Show Server Monitoring',

    //Server actions
    LoadAllServers = '[Server] Load Servers',
    LoadAllServerNames = '[Server] Load Server Names',

    LoadSingleServer = '[Server] Load Single Server',
    LoadShowServerInformation = '[Server] Load Show Server',

    LoadServerMonitoringStats = '[Server] Load Server Monitoring',
    LoadServerMonitoringStatsSuccess = '[Server] Load Server Monitoring Stats Success',
    LoadServerMonitoringStatsFailure = '[Server] Load Server Monitoring Stats Failure',

    AddServer = '[Server] Add Server',
    AddServerSuccess = '[Server] Add Server Success',
    AddServerFailure = '[Server] Add Server Failure',
    
    UpdateSelectedServer = '[Server] Update Selected Server',

    DeleteServer = '[Server] Delete Server',
    DeleteServerSuccess = '[Server] Delete Server Success',
    DeleteServerFailure = '[Server] Delete Server Failure'

    //Client actions
}

export class LoadAllServers implements Action {
    readonly type = ActionTypes.LoadAllServers
}

export class LoadSingleServer implements Action {
    readonly type = ActionTypes.LoadSingleServer
    constructor(public payload: number) {}
}

export class LoadServerMonitoringStats implements Action {
    readonly type = ActionTypes.LoadServerMonitoringStats
    constructor(public payload: Server) {}
}

export class LoadServerMonitoringStatsSuccess implements Action {
    readonly type = ActionTypes.LoadServerMonitoringStatsSuccess
    constructor(public payload: ServerMonitoring) {}
}

export class LoadServerMonitoringStatsFailure implements Action {
    readonly type = ActionTypes.LoadServerMonitoringStatsFailure
}

export class AddServer implements Action {
    readonly type = ActionTypes.AddServer
    constructor(public payload: Server) {}
}

export class AddServerSuccess implements Action {
    readonly type = ActionTypes.AddServerSuccess
    constructor(public payload: ServerMonitoring) {}
}

export class AddServerFailure implements Action {
    readonly type = ActionTypes.AddServerFailure 
}

export class LoadShowServerInformation implements Action {
    readonly type = ActionTypes.LoadShowServerInformation
}

export class UpdateSelectedServer implements Action {
    readonly type = ActionTypes.UpdateSelectedServer
    constructor(public payload: string) {}
}

export class UpdateShowServerInforamtion implements Action {
    readonly type = ActionTypes.UpdateShowServerInforamtion
    constructor(public payload: boolean) {}
}

export class UpdateShowServerMonitoring implements Action {
    readonly type = ActionTypes.UpdateShowServerMonitoring
    constructor(public payload: boolean) {}
}

export class DeleteServer implements Action {
    readonly type = ActionTypes.DeleteServer
    constructor(public payload: Server) {}
}

export class DeleteServerSuccess implements  Action {
    readonly type = ActionTypes.DeleteServerSuccess
    constructor(public payload: Server) {}
}

export class DeleteServerFailure implements Action {
    readonly type = ActionTypes.DeleteServerFailure
}

export type ServerActions = 
    | LoadAllServers
    | LoadSingleServer 
    | LoadShowServerInformation
    | LoadServerMonitoringStats
    | LoadServerMonitoringStatsSuccess
    | LoadServerMonitoringStatsFailure
    | AddServer
    | AddServerSuccess
    | AddServerFailure
    | UpdateSelectedServer
    | UpdateShowServerInforamtion
    | UpdateShowServerMonitoring
    | DeleteServer
    | DeleteServerSuccess
    | DeleteServerFailure;