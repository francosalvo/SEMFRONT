import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { newUser } from '../models/newUser';
import { Patent } from '../models/patent';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrentAccount } from '../models/CurrentAccount';

const USERNAME_KEY = 'AuthUserName';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usuarioURL = 'http://localhost:8084/users';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  public getPatentes(): Observable<Patent> {
    return this.http.get<Patent>(
      this.usuarioURL + '/patents/' + this.tokenService.getUserName()
    );
  }

  public chargeBalance(currentAccount: CurrentAccount): Observable<any> {
    return this.http.post<any>(
      this.usuarioURL + '/chargeBalance',
      currentAccount
    );
  }

  public getCurrentAccount(): Observable<any> {
    return this.http.get<any>(
      this.usuarioURL + '/getCurrentAccount/' + this.tokenService.getUserName()
    );
  }

  public getData(username: string): Observable<any> {
    return this.http.get<any>(
      this.usuarioURL + '/getData/' + this.tokenService.getUserName()
    );
  }
}
