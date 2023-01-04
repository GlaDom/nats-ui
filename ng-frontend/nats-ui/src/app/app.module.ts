import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ServerinformationComponent } from './serverinformation/serverinformation.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog'
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon'
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select'
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AddserverdialogComponent } from './addserverdialog/addserverdialog.component';
import { serverReducer } from './store/reducers/server.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ServerMonitoringComponent } from './server-monitoring/server-monitoring.component';
import { ServerService } from './services/server.service';
import { EffectsModule } from '@ngrx/effects';
import { ServerEffects } from './store/effects/server.effects';
import { ClientinformationComponent } from './clientinformation/clientinformation.component';
import { AddclientdialogComponent } from './addclientdialog/addclientdialog.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ServerinformationComponent,
    AddserverdialogComponent,
    ServerMonitoringComponent,
    ClientinformationComponent,
    AddclientdialogComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,
    StoreModule.forRoot({
      servers: serverReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    EffectsModule.forRoot([ServerEffects])
  ],
  entryComponents: [AddserverdialogComponent, AddclientdialogComponent],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    ServerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
