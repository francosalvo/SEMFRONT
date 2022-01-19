import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { Patente } from '../models/patente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioURL = 'http://localhost:8080/usuario';

  username : any = this.tokenService.getUserName();


  constructor(
    private http : HttpClient,
    private tokenService : TokenService
    ) {}
    


public getPatentes(): Observable<Patente>{
  return this.http.post<Patente>(this.usuarioURL+'/patentes', this.username);
}





}
