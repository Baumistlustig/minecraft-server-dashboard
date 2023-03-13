import { RconService } from './rcon.service';
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";

describe('RconService', () => {
  let service: RconService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new RconService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a command', () => {
    httpClientSpy.get.and.returnValue(of('B\'6TPS from last 1m, 5m, 15m: B\'a20.0, B\'a20.0, B\'a20.0'));

    service.sendCommand('tps').subscribe({
      next: (response) => {
        expect(response)
          .withContext('should return current tps')
          .toBe(
            'B\'6TPS from last 1m, 5m, 15m: B\'a20.0, B\'a20.0, B\'a20.0'
          );
      },
      error: err =>
        fail(err),
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });
});
