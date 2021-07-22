import { OnlineLoggedUserLastFmSyncService } from '@/auth/services/online-logged-user-last-fm-sync/online-logged-user-last-fm-sync.service';
import { Injectable } from '@angular/core';
import { LastFmSimpleTrack } from 'last-fm';
import { Observable } from 'rxjs';
import { ScrobbleResponseType } from '../../enums/scrobble-response-type';
import { Scrobble } from '../../interfaces/scrobble';
import { ScrobbleCacheService } from '../scrobble-cache/scrobble-cache.service';
import { ScrobbleService } from '../scrobble/scrobble.service';

@Injectable({
  providedIn: 'root',
})
export class ScrobbleStrategyService implements Scrobble {
  constructor(
    private onlineLoggedUserLastFmSyncService: OnlineLoggedUserLastFmSyncService,
    private scrobbleService: ScrobbleService,
    private scrobbleCacheService: ScrobbleCacheService
  ) {}

  scrobble(track: LastFmSimpleTrack, timestamp?: number): Observable<ScrobbleResponseType> {
    return this.onlineLoggedUserLastFmSyncService.isOnlineAndLogged()
      ? this.scrobbleService.scrobble(track, timestamp)
      : this.scrobbleCacheService.scrobble(track, timestamp);
  }
}
