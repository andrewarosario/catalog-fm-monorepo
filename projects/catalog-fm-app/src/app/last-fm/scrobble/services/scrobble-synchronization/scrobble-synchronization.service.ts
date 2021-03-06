import { OnlineLoggedUserLastFmService } from '@/auth/services/online-logged-user-last-fm/online-logged-user-last-fm.service';
import { Injectable } from '@angular/core';
import { UiMessageService } from 'catalog-fm-ui';
import { LastFmSimpleTrack } from 'last-fm';
import { forkJoin, Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ScrobbleMessage } from '../../decorators/scrobble-message.decorator';
import { ScrobbleResponseType } from '../../enums/scrobble-response-type';
import { ScrobbleCacheStorageService } from '../scrobble-cache-storage/scrobble-cache-storage.service';
import { ScrobbleService } from '../scrobble/scrobble.service';

@Injectable({
  providedIn: 'root',
})
export class ScrobbleSynchronizationService {
  constructor(
    private onlineLoggedUserLastFmService: OnlineLoggedUserLastFmService,
    private scrobbleCacheStorageService: ScrobbleCacheStorageService,
    private scrobbleService: ScrobbleService,
    public messageService: UiMessageService
  ) {}

  @ScrobbleMessage()
  synchronizeScrobbles(): Observable<ScrobbleResponseType[]> {
    return this.isOnlineAndLogged().pipe(
      switchMap(() => this.getScrobbleCache()),
      switchMap((tracks) => this.scrobbleTracksInCache(tracks)),
      tap(() => this.removeTracksInCache())
    );
  }

  private isOnlineAndLogged(): Observable<boolean> {
    return this.onlineLoggedUserLastFmService
      .isOnlineAndLogged()
      .pipe(filter((isOnline) => isOnline));
  }

  private getScrobbleCache(): Observable<LastFmSimpleTrack[]> {
    return this.scrobbleCacheStorageService
      .getScrobbles()
      .pipe(filter((scrobbles) => Boolean(scrobbles.length)));
  }

  private scrobbleTracksInCache(tracks: LastFmSimpleTrack[]): Observable<ScrobbleResponseType[]> {
    return forkJoin(tracks.map((track) => this.scrobbleService.scrobble(track)));
  }

  private removeTracksInCache(): void {
    this.scrobbleCacheStorageService.clear();
  }
}
