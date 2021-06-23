import { LastFmScrobbleResponse } from '@/user/models/last-fm-scrobble-response';
import { LastFmTrackScrobble } from '@/track/models/last-fm-track-scrobble';
import { Observable } from 'rxjs';

export interface LastFmUserScrobble {
  scrobble(params: LastFmTrackScrobble): Observable<LastFmScrobbleResponse>;
}
