import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RconService {

  constructor(private readonly http: HttpClient) {  }

  public sendCommand(command: string): Observable<any> {
    return this.http.get(`http://localhost:3000/${command}`, { responseType: 'text' });
  }
}
