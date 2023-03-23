import { Component, OnInit } from '@angular/core';
import { RconService} from "./services/rcon.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mc-server-dashboard';

  constructor(private readonly rcon: RconService) {}

  ngOnInit() {
    this.sendMessage();
  }

  sendMessage() {
    const msg = { port: 25575, host: "localhost", password: "123456" };
    console.log(msg);
    this.rcon.sendMessage(JSON.stringify(['initial', msg]));
  }
}
