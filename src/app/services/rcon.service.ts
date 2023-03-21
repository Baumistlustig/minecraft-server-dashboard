import { Injectable } from '@angular/core';
import { SimpleNgWebSocket } from "simple-ng-websocket";

export interface Message {
  author: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class RconService {
  constructor(private readonly ngws: SimpleNgWebSocket) {
    this.ngws.on('message', (msg) => {
      console.log('message received: ' + msg);
    });
  }

  sendMessage(msg: string): void {
    this.ngws.send(msg);
  }
}
