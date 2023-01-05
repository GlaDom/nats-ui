import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-client-monitoring',
  templateUrl: './client-monitoring.component.html',
  styleUrls: ['./client-monitoring.component.css']
})
export class ClientMonitoringComponent {
  messages$: any;
  displayedColumns: string[] = ["timestamp", "type", "subject", "message"]
  filters = this.formBuilder.group({
    info: true,
    ping: true,
    pong: true,
    ok: true,
    err: true,
    msg: true
  })

  constructor(
    private formBuilder: FormBuilder
  ) {}
}
