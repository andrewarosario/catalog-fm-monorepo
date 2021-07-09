import { LastFmMethod } from '@/api/enums/last-fm-method';
import { LastFmHttpParams } from '@/api/models/last-fm-http-params';
import { LastFmHttp } from '@/api/services/last-fm-http/last-fm-http.service';
import {
  LastFmTrackScrobble,
  LastFmTrackScrobbleParams,
} from '@/track/interfaces/last-fm-track-scrobble';
import { LastFmScrobbleResponse } from '@/user/models/last-fm-scrobble-response';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LastFmTrackScrobbleService implements LastFmTrackScrobble {
  constructor(private lastFmHttp: LastFmHttp) {}

  scrobble(trackScrobble: LastFmTrackScrobbleParams): Observable<LastFmScrobbleResponse> {
    const params = this.makeParams(trackScrobble);
    return this.lastFmHttp.post(params);
  }

  private makeParams(params: LastFmTrackScrobbleParams): LastFmHttpParams {
    return {
      method: LastFmMethod.TrackScrobble,
      data: { ...params },
      encode: ['album', 'artist', 'track'],
    };
  }
}
