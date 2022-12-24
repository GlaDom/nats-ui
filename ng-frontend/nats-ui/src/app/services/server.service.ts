import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Server } from '../models/server';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  getStatusOfServer(server: Server, url: string) {
    return this.http.get<Server>(url)
  }
}
