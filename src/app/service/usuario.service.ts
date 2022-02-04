import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { Patente } from '../models/patente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrentAccount } from '../models/CurrentAccount';

const USERNAME_KEY = 'AuthUserName';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  usuarioURL = 'http://localhost:8084/users';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  public getPatentes(): Observable<Patente> {
    // console.log(this.tokenService.getUserName());
    return this.http.get<Patente>(
      this.usuarioURL + '/patents/' + this.tokenService.getUserName()
    );
  }

  public chargeBalance(currentAccount: CurrentAccount): Observable<any> {
    return this.http.post<any>(
      this.usuarioURL + '/chargeBalance',
      currentAccount
    );
  }

  public getCurrentAccount(username: string): Observable<any> {
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
