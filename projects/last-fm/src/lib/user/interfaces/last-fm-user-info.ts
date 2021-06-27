import { Observable } from 'rxjs';
import { LastfmUser } from '../models/last-fm-user';

export interface LastFmUserResponse {
  user: LastfmUser;
}

export interface LastFmUserInfo {
  getInfo(user: string): Observable<LastFmUserResponse>;
}
