import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddclientdialogComponent } from '../addclientdialog/addclientdialog.component';
import { Client } from '../models/client.model';

@Component({
  selector: 'app-clientinformation',
  templateUrl: './clientinformation.component.html',
  styleUrls: ['./clientinformation.component.css']
})
export class ClientinformationComponent {
  clients$: Client[] = [
    {
      name: "test-client",
      serverAddress: "172.18.0.2:4222"
    }
  ];
  displayedColumns: string[] = ["name", "serveraddress", "operations"]
  addClientDialogRef?: MatDialogRef<AddclientdialogComponent>;

  constructor(
    private dialog: MatDialog
  ){}

  openAddClientDialog(): void {
    this.addClientDialogRef = this.dialog.open(AddclientdialogComponent)
  }

  deleteClient(client: any): void {}
}
