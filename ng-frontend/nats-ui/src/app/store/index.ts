import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { ServerState, serverReducer } from './reducers/server.reducers';

export const getServerState = createFeatureSelector<ServerState>('servers')

export const getAllServers = createSelector(
    getServerState,
    (state: ServerState) => state.servers
);