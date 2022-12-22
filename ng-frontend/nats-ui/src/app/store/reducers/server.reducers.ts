import { Server } from '../../models/server'
import { ActionTypes, ServerActions } from '../actions/server.actions';

export interface ServerState {
    servers: Server[];
    selectedServer: Server;
    showServerInformation: boolean;
    showServerMonitoring: boolean;
}

export const initialState: ServerState = {
    servers: [],
    selectedServer: {},
    showServerInformation: false,
    showServerMonitoring: false
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