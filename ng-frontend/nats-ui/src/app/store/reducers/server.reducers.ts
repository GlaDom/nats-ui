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
            const index = state.servers.findIndex(server => server.hostname == action.payload.host)
            const newServerArray: Server[] = [];
            state.servers.forEach(server => {
                console.log(server)
                newServerArray.push(Object.assign({}, server))})
            console.log(action.payload)
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