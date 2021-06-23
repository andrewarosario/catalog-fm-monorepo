import { LastFmMethod } from '@/api/enums/last-fm-method';
import { LastFmHttpParams } from '@/api/models/last-fm-http-params';
import { LastFmHttp } from '@/api/services/last-fm-http/last-fm-http.service';
import { LastFmUserResponse } from '@/user/models/last-fm-user-response';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LastFmUserInfoService {
  constructor(private lastFmHttp: LastFmHttp) {}

  getInfo(user: string): Observable<LastFmUserResponse> {
    const params = this.makeParams(user);
    return this.lastFmHttp.get(params);
  }

  private makeParams(user: string): LastFmHttpParams {
    return {
      method: LastFmMethod.UserGetInfo,
      data: { user },
    };
  }
}
