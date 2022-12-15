import { Component } from '@angular/core';
import { Server } from '../models/server';

@Component({
  selector: 'app-serverinformation',
  templateUrl: './serverinformation.component.html',
  styleUrls: ['./serverinformation.component.css']
})

export class ServerinformationComponent {
  dataSource: Server[]
  displayedColumns: string[] = ["name", "hostname", "port", "monitoringPort", "connections", "messagesIn", "messagesOut", "bytesIn", "bytesOut", "status", "operations"]

  constructor() {
    this.dataSource = [
      {
        name: "nats-server",
        hostname: "192.168.178.2",
        port: 4222,
        monitoringPort: 8222,
        connections: 3,
        messagesIn: 2402,
        messagesOut: 422,
        bytesIn: 23042,
        bytesOut: 4322,
        status: "online"
      },
      {
        name: "nats-server2",
        hostname: "192.168.178.3",
        port: 4223,
        monitoringPort: 8223,
        connections: 4,
        messagesIn: 2402,
        messagesOut: 422,
        bytesIn: 23042,
        bytesOut: 4322,
        status: "online"
      }
    ]
  }
}
