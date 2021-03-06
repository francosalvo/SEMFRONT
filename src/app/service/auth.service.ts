import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../models/jwt-dto';
import { LoginUsuario } from '../models/login-usuario';
import { newUser } from '../models/newUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authURL = 'http://localhost:8084/auth/';
  constructor(private httpClient: HttpClient) {}

  public new(newUser: newUser): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'nuevo', newUser);
  }
  public login(loginUsuario: LoginUsuario): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(this.authURL + 'login', loginUsuario);
  }
}
