import { LastFmScrobbleResponse } from '@/user/models/last-fm-scrobble-response';
import { Observable } from 'rxjs';
import { LastFmSimpleTrack } from '@/track/models/last-fm-simple-track';

export interface LastFmTrackScrobbleParams extends LastFmSimpleTrack {
  timestamp: string;
  sk: string;
}

export interface LastFmTrackScrobble {
  scrobble(params: LastFmTrackScrobbleParams): Observable<LastFmScrobbleResponse>;
}
