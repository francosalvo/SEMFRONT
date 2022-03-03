import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { newPatent } from '../models/newPatent';
import { Patent } from '../models/patent';

@Injectable({
  providedIn: 'root',
})
export class PatenteService {
  patenteURL = 'http://localhost:8084/patentes';

  newPatent!: newPatent;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  getAll(): Observable<Patent> {
    return this.http.get<Patent>(this.patenteURL);
  }

  create(patente: string, usuario: string): Observable<any> {
    this.newPatent = new newPatent(patente, usuario);
    return this.http.post<any>(this.patenteURL + '/guardar', this.newPatent);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.patenteURL + '/' + id);
  }

  get(id: number): Observable<Patent> {
    return this.http.get<Patent>(this.patenteURL + '/' + id);
  }

  update(patent: Patent): Observable<Patent> {
    console.log('contenido de patente en service: ', patent);
    return this.http.put<Patent>(this.patenteURL + '/' + patent.id, patent);
  }
}
