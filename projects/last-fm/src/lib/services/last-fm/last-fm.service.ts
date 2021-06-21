import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LastFmUrlBuilder } from '@/services/last-fm-url-builder/last-fm-url-builder.service';
import { LastFmHttpParams } from '@/models/last-fm-http-params';

@Injectable({
  providedIn: 'root',
})
export class LastFmService {
  constructor(private http: HttpClient, private lastFmUrlBuilder: LastFmUrlBuilder) {}

  public get<T>(data: LastFmHttpParams): Observable<T> {
    return this.http.get<T>(this.lastFmUrlBuilder.buildUrl(data));
  }

  public post<T>(data: LastFmHttpParams): Observable<T> {
    return this.http.post<T>(this.lastFmUrlBuilder.buildUrl(data), null);
  }
}
