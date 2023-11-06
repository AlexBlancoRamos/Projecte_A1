import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PlanaPrincipalComponent } from './plana-principal/plana-principal.component';
import {RouterOutlet} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {routing} from "./app.routing";
import {FormsModule} from "@angular/forms";
import {SocketIoModule, SocketIoConfig} from "ngx-socket-io";


const config: SocketIoConfig = {
  url: environment.socketUrl,
  options: {
    transports: ['websocket']
  }
}


@NgModule({
  declarations: [
    AppComponent,
    PlanaPrincipalComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    HttpClientModule,
    routing,
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
