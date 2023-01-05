import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { AddclientdialogComponent } from '../addclientdialog/addclientdialog.component';
import { Client } from '../models/client.model';
import { getAllClients } from '../store';
import { LoadAllClients } from '../store/actions/server.actions';
import { AppState } from '../store/reducers/server.reducers';

@Component({
  selector: 'app-clientinformation',
  templateUrl: './clientinformation.component.html',
  styleUrls: ['./clientinformation.component.css']
})
export class ClientinformationComponent implements OnInit {
  clients$: Client[] = [];
  displayedColumns: string[] = ["name", "serveraddress", "operations"]
  addClientDialogRef?: MatDialogRef<AddclientdialogComponent>;

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.store.dispatch(new LoadAllClients)
    this.store.pipe(select(getAllClients)).subscribe(state => {
      this.clients$ = state
    })
  }

  openAddClientDialog(): void {
    this.addClientDialogRef = this.dialog.open(AddclientdialogComponent)
  }

  deleteClient(client: any): void {}
}
