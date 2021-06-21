import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LastFmHttp } from '@/services/last-fm-http/last-fm-http.service';
import { LastFmHttpParams } from '@/models/last-fm-http-params';

@Injectable({
  providedIn: 'root',
})
export class LastFmService {
  constructor(private http: HttpClient, private lastFmHttp: LastFmHttp) {}

  public get<T>(data: LastFmHttpParams): Observable<T> {
    return this.http.get<T>(this.lastFmHttp.buildUrl(data));
  }

  public post<T>(data: LastFmHttpParams): Observable<T> {
    return this.http.post<T>(this.lastFmHttp.buildUrl(data), null);
  }
}
