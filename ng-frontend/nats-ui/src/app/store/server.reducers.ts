import { Server } from '../models/server'
import { ActionTypes, ServerActions } from './server.actions';

export interface ServerState {
    servers: Server[];
    selectedServer: Server;
}

export const initialState: ServerState = {
    servers: [
        {
            "name": "test-server",
            "hostname": "192.168.178.0.1",
            "port": 4222,
            "monitoringPort": 8222
        }
    ],
    selectedServer: {},
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

        case ActionTypes.AddServer: {
            return {
                ...state,
                servers: [...state.servers, action.payload]
            }
        }

        default:
            return state
    }
}