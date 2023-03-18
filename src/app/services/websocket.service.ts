import { Injectable } from '@angular/core';
import {AnonymousSubject, Subject} from "rxjs/internal/Subject";
import {Observable, Observer} from "rxjs";

const url = 'ws://localhost:3000';

export interface Message {
  source: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private subject: AnonymousSubject<MessageEvent>;
  public messages: Subject<Message>;

  constructor() {
    this.messages = <Subject<Message>>this.connect(url).pipe()
      .map((response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          source: data.source,
          message: data.message
        }
      });
  }

  public connect(url: string) {
    if (!this.subject) {
      this.subject = this.create(url);
    }

    return this.subject;
  }

  private create(url: string): AnonymousSubject<MessageEvent> {
    let ws = new WebSocket(url);
    let observable = new Observable((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });

    let observer = {
      error: () => null,
      complete: null,
      next: (data: Object) => {
        console.log('Message sent to websocket: ', data);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    return new AnonymousSubject<MessageEvent>(observer, observable);
  }
}
