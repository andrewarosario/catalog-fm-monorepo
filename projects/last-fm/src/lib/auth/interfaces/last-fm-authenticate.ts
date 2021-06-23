import { Observable } from 'rxjs';
import { LastFmAuthResponse } from '../models/last-fm-auth-response';

export interface LastFmAuthenticate {
  authenticate(token: string): Observable<LastFmAuthResponse>;
}
