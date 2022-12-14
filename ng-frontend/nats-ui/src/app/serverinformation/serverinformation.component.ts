import { Component } from '@angular/core';
import { Server } from '../models/server';

@Component({
  selector: 'app-serverinformation',
  templateUrl: './serverinformation.component.html',
  styleUrls: ['./serverinformation.component.css']
})

export class ServerinformationComponent {
  dataSource: Server[]
  displayedColumns: string[] = ["Name"]

  constructor() {
    this.dataSource = [
      {
        name: "test",
      }
    ]
  }
}
