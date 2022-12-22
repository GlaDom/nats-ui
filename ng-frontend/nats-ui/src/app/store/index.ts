import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { Server } from '../models/server';
import { ServerState, serverReducer } from './reducers/server.reducers';

export const getServerState = createFeatureSelector<ServerState>('servers')

export const getAllServers = createSelector(
    getServerState,
    (state: ServerState) => state.servers
);

export const getShowServerInformation = createSelector(
    getServerState,
    (state: ServerState) => state.showServerInformation
)

export const getShowServerMonitoring = createSelector(
    getServerState,
    (state: ServerState) => state.showServerMonitoring
)