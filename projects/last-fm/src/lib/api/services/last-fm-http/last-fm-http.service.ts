import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LastFmUrlBuilder } from '@/api/services/last-fm-url-builder/last-fm-url-builder.service';
import { LastFmHttpParams } from '@/api/models/last-fm-http-params';

@Injectable({
  providedIn: 'root',
})
export class LastFmHttp {
  constructor(private http: HttpClient, private lastFmUrlBuilder: LastFmUrlBuilder) {}

  public get<T>(data: LastFmHttpParams): Observable<T> {
    return this.http.get<T>(this.lastFmUrlBuilder.buildUrl(data));
  }

  public post<T>(data: LastFmHttpParams): Observable<T> {
    return this.http.post<T>(this.lastFmUrlBuilder.buildUrl(data), null);
  }
}
