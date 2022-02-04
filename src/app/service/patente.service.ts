import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { nuevaPatente } from '../models/nueva-patente';
import { Patente } from '../models/patente';

@Injectable({
  providedIn: 'root',
})
export class PatenteService {
  patenteURL = 'http://localhost:8084/patentes';

  nuevaPatente!: nuevaPatente;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  getAll(): Observable<Patente> {
    return this.http.get<Patente>(this.patenteURL);
  }

  create(patente: string, usuario: string): Observable<any> {
    this.nuevaPatente = new nuevaPatente(patente, usuario);
    return this.http.post<any>(this.patenteURL + '/guardar', this.nuevaPatente);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.patenteURL + '/' + id);
  }

  get(id: number): Observable<Patente> {
    return this.http.get<Patente>(this.patenteURL + '/' + id);
  }

  update(patent: Patente): Observable<Patente> {
    console.log('contenido de patente en service: ', patent);
    return this.http.put<Patente>(this.patenteURL + '/' + patent.id, patent);
  }
}
