import { Component } from '@angular/core';

@Component({
  selector: 'app-client-monitoring',
  templateUrl: './client-monitoring.component.html',
  styleUrls: ['./client-monitoring.component.css']
})
export class ClientMonitoringComponent {
  messages$: any;
  displayedColumns: string[] = ["timestamp", "type", "subject", "message"]

  constructor() {}
}
