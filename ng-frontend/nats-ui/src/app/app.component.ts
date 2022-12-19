import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { AddserverdialogComponent } from './addserverdialog/addserverdialog.component';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nats-ui';

  addServerDialogRef?: MatDialogRef<AddserverdialogComponent>;

  constructor(private dialog: MatDialog) {}

  opendAddServerDialog() {
    this.addServerDialogRef = this.dialog.open(AddserverdialogComponent)
  }
}
