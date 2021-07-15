import { LastFmSimpleTrack } from 'last-fm';
import { Observable } from 'rxjs';
import { ScrobbleResponseType } from '../enums/scrobble-response-type';

export interface Scrobble {
  scrobble(track: LastFmSimpleTrack, timestamp: number): Observable<ScrobbleResponseType>;
}
