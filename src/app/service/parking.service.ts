import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { Parking } from '../models/Parking';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  parkingURL = 'http://localhost:8084/parking';

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}

  public save(parking: Parking): Observable<any> {
    return this.httpClient.post<any>(this.parkingURL + '/save', parking);
  }

  public endParking(): Observable<any> {
    return this.httpClient.get<any>(
      this.parkingURL + '/endParking/' + this.tokenService.getUserName()
    );
  }

  public getTime(): Observable<any> {
    return this.httpClient.get<any>(
      this.parkingURL + '/getTime/' + this.tokenService.getUserName()
    );
  }

  public getParkingStartedByUser(): Observable<any> {
    return this.httpClient.get<any>(
      this.parkingURL +
        '/getParkingStartedByUser/' +
        this.tokenService.getUserName()
    );
  }
}
