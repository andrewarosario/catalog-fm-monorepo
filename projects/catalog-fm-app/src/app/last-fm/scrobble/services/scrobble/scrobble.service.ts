import { Injectable } from '@angular/core';
import { LastFmTrackScrobbleService, LastFmSimpleTrack, LastFmScrobbleResponse } from 'last-fm';
import { AuthUserStore } from '@/core/auth/store/auth-user.store';
import { Observable } from 'rxjs';
import { DateHelper } from 'catalog-fm-utils';
import { mapTo } from 'rxjs/operators';
import { ScrobbleResponseType } from '@/last-fm/scrobble/enums/scrobble-response-type';
import { Scrobble } from '../../interfaces/scrobble';

@Injectable({
  providedIn: 'root',
})
export class ScrobbleService implements Scrobble {
  constructor(
    private authUserStore: AuthUserStore,
    private lastFmTrackScrobbleService: LastFmTrackScrobbleService,
    private dateHelper: DateHelper
  ) {}

  scrobble(
    track: LastFmSimpleTrack,
    timestamp: number = this.dateHelper.unixTimestamp
  ): Observable<ScrobbleResponseType> {
    return this.lastFmTrackScrobbleService
      .scrobble({
        ...track,
        timestamp: String(timestamp),
        sk: this.authUserStore.authUser.lastFmSession.key,
      })
      .pipe(mapTo(ScrobbleResponseType.Success));
  }
}
