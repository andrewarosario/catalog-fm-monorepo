import { LastFmMethod } from '@/api/enums/last-fm-method';
import { LastFmHttpParams } from '@/api/models/last-fm-http-params';
import { LastFmHttp } from '@/api/services/last-fm-http/last-fm-http.service';
import { LastFmAuthResponse } from '@/auth/models/last-fm-auth-response';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LastFmAuthService implements LastFmAuthService {
  constructor(private lastFmHttp: LastFmHttp) {}

  authenticate(token: string): Observable<LastFmAuthResponse> {
    const params = this.makeParams(token);
    return this.lastFmHttp.get<LastFmAuthResponse>(params);
  }

  private makeParams(token: string): LastFmHttpParams {
    return {
      method: LastFmMethod.AuthGetSession,
      data: { token },
    };
  }
}
