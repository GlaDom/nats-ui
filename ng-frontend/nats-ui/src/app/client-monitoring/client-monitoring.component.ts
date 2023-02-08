import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Client } from '../models/client.model';
import { Message } from '../models/message.model';
import { Server } from '../models/server';
import { ClientService } from '../services/client.service';
import { getAllServers, getSelectedClient } from '../store';
import { AppState } from '../store/reducers/server.reducers';

@Component({
  selector: 'app-client-monitoring',
  templateUrl: './client-monitoring.component.html',
  styleUrls: ['./client-monitoring.component.css']
})
export class ClientMonitoringComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;

  filterString: string = "info$message"
  displayedColumns: string[] = ["timestamp", "type", "subject", "message"]
  filters = this.formBuilder.group({
    info: true,
    // ping: true,
    // pong: true,
    // ok: true,
    // err: true,
    msg: true,
    stringFilter: "",
  })
  
  selectedClient: Client;
  selectedServer: Server;
  servers$: Server[];
  messages$ = new MatTableDataSource<Message>();
  destroyed$ = new Subject();
  subcribed: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private webSocket: ClientService
  ) {}

  ngOnInit(): void {
    this.store.pipe(select(getSelectedClient)).subscribe(state => {
      this.selectedClient = state
    })
    this.store.pipe(select(getAllServers)).subscribe(state => {
      this.servers$ = state
    })
    //applyFilter()
    this.filters.valueChanges.subscribe(values => {
      this.filterString = "";
      let filterArray = [];
      // if (values.err) {
      //   filterArray.push("error")
      // }
      if (values.info) {
        filterArray.push("info")
      }
      if (values.msg) {
        filterArray.push("message")
      }
      if (values.stringFilter != "") {
        filterArray.push(values.stringFilter)
      }
      // if (values.ok) {
      //   filterArray.push("ok")
      // }
      // if (values.ping) {
      //   filterArray.push("ping")
      // }
      // if (values.pong) {
      //   filterArray.push("pong")
      // }
      this.filterString = filterArray.join("$")
      this.messages$.filter = this.filterString.toLocaleLowerCase()
    })
    this.messages$.filterPredicate = this.getFilterPredicate();
  }

  ngAfterViewInit() {
    this.messages$.paginator = this.paginator
  }

  changeSelectedServer(event):void {
    for(let i=0; i< this.servers$.length;i++) {
      if(this.servers$[i].name == event) {
        this.selectedServer = this.servers$[i]
      }
    }
  }

  getMessagesForClient() {
    this.messages$.filter = this.filterString;
    this.subcribed = true;
    this.webSocket.connect(this.selectedServer.host, this.selectedServer.port.toString()).pipe(
      takeUntil(this.destroyed$)
    ).subscribe(message => {
      this.messages$.data.unshift(message)
      let newData = this.messages$.data
      this.messages$.data = newData
    })
  }

  unsubscribe() {
    this.subcribed = false
    this.webSocket.ngOnDestroy()
  }

  getFilterPredicate() {
    return (row: Message, filter: string) => {
      const filterArray = filter.split("$")
      console.log(filterArray)
      const matchFilter = [];

      const columnType = row.type
      const columnSubject = row.subject

      let customFilterType = false;
      let customFilterSubject = false;

      for(let i=0; i<filterArray.length;i++) {
        customFilterType = columnType.toLowerCase().includes(filterArray[i])
        console.log(columnType.toLowerCase(), customFilterType)
        customFilterSubject = columnSubject.toLocaleLowerCase().includes(filterArray[i])
        console.log(columnSubject.toLowerCase(), customFilterSubject)
        if (customFilterType || customFilterSubject) {
          break
        }
      }

      if(customFilterType && !customFilterSubject){
        matchFilter.push(customFilterType)
      } else if(customFilterSubject && !customFilterType) {
        matchFilter.push(customFilterSubject)
      } else if(customFilterSubject && customFilterType) {
        matchFilter.push(customFilterSubject)
      } else {
        matchFilter.push(false)
      }
      return matchFilter.every(Boolean)
    }
  }
}
