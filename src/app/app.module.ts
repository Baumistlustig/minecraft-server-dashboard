import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { RconService } from "./services/rcon.service";
import { CONNECT_URL, LOGGER, SimpleNgWebSocket} from "simple-ng-websocket";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    RconService,
    { provide: CONNECT_URL, useValue: 'ws://localhost:3000' },
    { provide: LOGGER, useValue: (level: any, message: any) => console.log(message) },
    SimpleNgWebSocket,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
