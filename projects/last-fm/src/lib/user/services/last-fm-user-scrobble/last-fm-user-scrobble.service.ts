import { LastFmMethod } from '@/api/enums/last-fm-method';
import { LastFmHttpParams } from '@/api/models/last-fm-http-params';
import { LastFmHttp } from '@/api/services/last-fm-http/last-fm-http.service';
import { LastFmTrackScrobble } from '@/track/models/last-fm-track-scrobble';
import { LastFmUserScrobble } from '@/user/interfaces/last-fm-user-scrobble';
import { LastFmScrobbleResponse } from '@/user/models/last-fm-scrobble-response';
import { Observable } from 'rxjs';

export class LastFmUserScrobbleService implements LastFmUserScrobble {
  constructor(private lastFmHttp: LastFmHttp) {}

  scrobble(trackScrobble: LastFmTrackScrobble): Observable<LastFmScrobbleResponse> {
    const params = this.makeParams(trackScrobble);
    return this.lastFmHttp.post(params);
  }

  private makeParams(params: LastFmTrackScrobble): LastFmHttpParams {
    return {
      method: LastFmMethod.TrackScrobble,
      data: { ...params },
      encode: ['album', 'artist', 'track'],
    };
  }
}
