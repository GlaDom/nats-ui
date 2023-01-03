import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Server } from '../models/server';
import { ServerMonitoring } from '../models/server-monitoring.model';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  addNewServer(server: Server, url: string) {

    return this.http.post<ServerMonitoring>(url, server)
  }

  getServerMonitoringStats(server: Server, url: string) {
    let params = new HttpParams();

    if(server != null) {
      params = params.append("hostname", server.host)
    }

    return this.http.get<ServerMonitoring>(url, {params})
  }

  deleteServer(server: Server, url:string) {
    let params = new HttpParams();

    if(server.host != "") {
      params = params.append("hostname", server.host)
    }

    return this.http.delete<Server>(url, {params})
  }
}
