import { Client } from 'src/app/models/client.model';
import { ServerStats } from 'src/app/models/server-monitoring.model';
import { Server } from '../../models/server'
import { ActionTypes, AddServerSuccess, ServerActions, UpdateSelectedServer } from '../actions/server.actions';

export interface AppState {
    servers: Server[];
    selectedServer: Server;
    serverMonitoring: ServerStats;
    clients: Client[];
    selectedClient: Client;
    showServerInformation: boolean;
    showServerMonitoring: boolean;
    showClientInformation: boolean;
    showClientMonitoring: boolean;
}

export const initialState: AppState = {
    servers: [],
    selectedServer: {},
    serverMonitoring: {
        serverMonitoring: null,
        error: null,
        status: 'pending'
    },
    clients: [],
    selectedClient: {},
    showServerInformation: false,
    showServerMonitoring: false,
    showClientInformation: false,
    showClientMonitoring: false
}

export function serverReducer(
    state = initialState,
    action: ServerActions
): AppState {
    // manimpulate state
    switch(action.type) {
        case ActionTypes.LoadAllServers: {
            return state
        }
        
        case ActionTypes.LoadSingleServer: {
            return {
                ...state,
                selectedServer: state.servers[action.payload]
            }
        }

        case ActionTypes.LoadShowServerInformation: {
            return state
        }

        case ActionTypes.LoadServerMonitoringStats: {
            return state
        }

        case ActionTypes.LoadServerMonitoringStatsSuccess: {
            console.log(action.payload)
            const newServerMonitoring = Object.assign({}, state.serverMonitoring);
            newServerMonitoring.serverMonitoring = action.payload
            newServerMonitoring.status = 'success'
            return {
                ...state,
                serverMonitoring: newServerMonitoring
            }
        }

        case ActionTypes.LoadServerMonitoringStatsFailure: {
            let newServerMonitoring =  state.serverMonitoring
            newServerMonitoring.error = 'failure'
            return {
                ...state,
                serverMonitoring: newServerMonitoring
            }
        }

        case ActionTypes.AddServer: {
            return {
                ...state,
                servers: [...state.servers, action.payload]
            }
        }

        case ActionTypes.AddServerSuccess: {
            const index = state.servers.findIndex(server => server.host == action.payload.host)
            const newServerArray: Server[] = [];
            state.servers.forEach(server => {
                newServerArray.push(Object.assign({}, server))})
            newServerArray[index].status = 'connected'
            newServerArray[index].connections = action.payload.varz.connections
            newServerArray[index].bytesIn = action.payload.varz.in_bytes
            newServerArray[index].bytesOut = action.payload.varz.out_bytes
            newServerArray[index].messagesIn = action.payload.varz.in_msgs
            newServerArray[index].messagesIn = action.payload.varz.out_msgs
            return {
                ...state, 
                servers: newServerArray
            }
        }

        case ActionTypes.AddServerFailure: {
            const newServerArray: Server[] = [];
            state.servers.forEach(server => newServerArray.push(Object.assign({}, server)))
            newServerArray[state.servers.length-1].status = 'disconnected'
            return {
                ...state,
                servers: newServerArray
            }
        }

        case ActionTypes.UpdateSelectedServer: {
            const index = state.servers.findIndex(server => server.name == action.payload)
            const newSelectedServer = state.servers[index]
            return {
                ...state,
                selectedServer: newSelectedServer
            }
        }

        case ActionTypes.UpdateShowServerInforamtion: {
            return {
                ...state,
                showServerInformation: action.payload
            }
        }

        case ActionTypes.UpdateShowServerMonitoring: {
            return {
                ...state,
                showServerMonitoring: action.payload
            }
        }

        case ActionTypes.UpdateShowServerInforamtion: {
            return {
                ...state,
                showServerInformation: action.payload
            }
        }

        case ActionTypes.UpdateShowServerMonitoring: {
            return {
                ...state,
                showServerMonitoring: action.payload
            }
        }

        case ActionTypes.UpdateShowClientInformation: {
            return {
                ...state,
                showClientInformation: action.payload
            }
        }

        case ActionTypes.DeleteServer: {
            return state
        }

        case ActionTypes.DeleteServerSuccess: {
            const newServerArray: Server[] = [];
            state.servers.forEach(server => {
                if(server.host != action.payload.host){
                    newServerArray.push(Object.assign({}, server))
                }
            })

            return {
                ...state,
                servers: newServerArray
            }
        }

        case ActionTypes.DeleteServerFailure: {
            return state
        }

        default:
            return state
    }
}