import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { Server } from '../models/server';
import { AppState } from './reducers/server.reducers';

export const getServerState = createFeatureSelector<AppState>('servers')

export const getAllServers = createSelector(
    getServerState,
    (state: AppState) => state.servers
);

export const getShowServerInformation = createSelector(
    getServerState,
    (state: AppState) => state.showServerInformation
)

export const getShowServerMonitoring = createSelector(
    getServerState,
    (state: AppState) => state.showServerMonitoring
)

export const getShowClientInformation = createSelector(
    getServerState,
    (state: AppState) => state.showClientInformation
)

export const getSelectedServer = createSelector(
    getServerState,
    (state: AppState) => state.selectedServer
)

export const getServerMonitoringStats = createSelector(
    getServerState,
    (state: AppState) => state.serverMonitoring.serverMonitoring
)

export const getAllClients = createSelector(
    getServerState,
    (state: AppState) => state.clients
)