import { Observable } from 'rxjs';
import { LastFmUserResponse } from '../models/last-fm-user-response';

export interface LastFmUserInfo {
  getInfo(user: string): Observable<LastFmUserResponse>;
}
