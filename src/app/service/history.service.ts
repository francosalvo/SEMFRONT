import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { History } from '../models/History';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  historyURL = 'http://localhost:8084/history';

  constructor(private httlClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httlClient.get<any>(this.historyURL);
  }

  create(history: History): Observable<any> {
    return this.httlClient.post<any>(this.historyURL, history);
  }

  getByCc(id: number): Observable<any> {
    return this.httlClient.get<any>(this.historyURL + '/' + id);
  }
}
