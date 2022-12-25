import { ServerStats } from 'src/app/models/server-monitoring.model';
import { Server } from '../../models/server'
import { ActionTypes, AddServerSuccess, ServerActions } from '../actions/server.actions';

export interface ServerState {
    servers: Server[];
    selectedServer: Server;
    showServerInformation: boolean;
    showServerMonitoring: boolean;
    serverMonitoring: ServerStats;
}

export const initialState: ServerState = {
    servers: [],
    selectedServer: {},
    showServerInformation: false,
    showServerMonitoring: false,
    serverMonitoring: {
        serverMonitoring: null,
        error: null,
        status: 'pending'
    }
}

export function serverReducer(
    state = initialState,
    action: ServerActions
): ServerState {
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

        case ActionTypes.AddServer: {
            return {
                ...state,
                servers: [...state.servers, action.payload]
            }
        }

        case ActionTypes.AddServerSuccess: {
            //state.servers.map(())
            return {
                ...state, 
            }
        }

        case ActionTypes.AddServerFailure: {
            //state.servers[state.servers.length-1].status = 'disconnected'
            console.log(state.servers)
            return state
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

        default:
            return state
    }
}