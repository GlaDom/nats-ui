import { Action } from '@ngrx/store'
import { Client } from 'src/app/models/client.model'
import { ServerMonitoring } from 'src/app/models/server-monitoring.model'
import { Server } from '../../models/server'

export enum ActionTypes {
    //App actions
    LoadShowServerInformation = '[Server] Load Show Server',

    UpdateShowServerInforamtion = '[Server] Update Show Server',
    UpdateShowServerMonitoring = '[Server] Update Show Server Monitoring',
    UpdateShowClientInformation = '[Client] Update Show Client',
    UpdateShowClientMonitoring = '[Client] Update Show Client Monitoring',

    //Server actions
    LoadAllServers = '[Server] Load Servers',
    LoadAllServerNames = '[Server] Load Server Names',

    LoadSingleServer = '[Server] Load Single Server',

    LoadServerMonitoringStats = '[Server] Load Server Monitoring',
    LoadServerMonitoringStatsSuccess = '[Server] Load Server Monitoring Stats Success',
    LoadServerMonitoringStatsFailure = '[Server] Load Server Monitoring Stats Failure',

    AddServer = '[Server] Add Server',
    AddServerSuccess = '[Server] Add Server Success',
    AddServerFailure = '[Server] Add Server Failure',
    
    UpdateSelectedServer = '[Server] Update Selected Server',

    DeleteServer = '[Server] Delete Server',
    DeleteServerSuccess = '[Server] Delete Server Success',
    DeleteServerFailure = '[Server] Delete Server Failure',

    //Client actions
    LoadAllClients = '[Client] Load Clients',
    LoadSingleClient = '[Client] Load Single Client',

    AddClient = '[Client] Add Client',

    UpdateSelectedClient = '[Client] Update Selected Client',

    DeleteClient = '[Client] Delete Client'
}

//Global App classes
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

export class UpdateShowClientInformation {
    readonly type = ActionTypes.UpdateShowClientInformation
    constructor(public payload: boolean) {}
}

export class UpdateShowClientMonitoring {
    readonly type = ActionTypes.UpdateShowClientMonitoring
    constructor(public payload: boolean) {}
}

//Server classes
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

export class UpdateSelectedServer implements Action {
    readonly type = ActionTypes.UpdateSelectedServer
    constructor(public payload: string) {}
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
    constructor(public payload: Server) {}
}

//Client classes
export class LoadAllClients implements Action {
    readonly type = ActionTypes.LoadAllClients
}

export class LoadSingleClient implements Action {
    readonly type = ActionTypes.LoadSingleClient
    constructor(public payload: string) {}
}

export class AddClient implements Action {
    readonly type = ActionTypes.AddClient
    constructor(public payload: Client) {}
}

export class UpdateSelectedClient implements Action {
    readonly type = ActionTypes.UpdateSelectedClient
    constructor(public payload: string) {}
}

export class DeleteClient implements Action {
    readonly type = ActionTypes.DeleteClient
    constructor(public payload: string) {}
}

export type ServerActions = 
    | LoadAllServers
    | LoadAllClients
    | LoadSingleServer
    | LoadSingleClient 
    | LoadShowServerInformation
    | LoadServerMonitoringStats
    | LoadServerMonitoringStatsSuccess
    | LoadServerMonitoringStatsFailure
    | AddServer
    | AddClient
    | AddServerSuccess
    | AddServerFailure
    | UpdateSelectedServer
    | UpdateSelectedClient
    | UpdateShowServerInforamtion
    | UpdateShowServerMonitoring
    | UpdateShowClientInformation
    | UpdateShowClientMonitoring
    | DeleteServer
    | DeleteServerSuccess
    | DeleteServerFailure
    | DeleteClient;