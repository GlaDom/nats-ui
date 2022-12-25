import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Server } from '../models/server';
import { ServerMonitoring } from '../models/server-monitoring.model';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  getStatusOfServer(server: Server, url: string) {
    let params = new HttpParams();

    if(server != null) {
      params = params.append("hostname", server.hostname)
      params = params.append("monitoringPort", server.monitoringPort)
    }

    return this.http.get<ServerMonitoring>(url, {params})
  }
}
