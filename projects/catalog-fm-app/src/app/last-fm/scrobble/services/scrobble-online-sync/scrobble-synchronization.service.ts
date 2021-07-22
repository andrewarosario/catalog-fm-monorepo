import { OnlineLoggedUserLastFmService } from '@/core/auth/services/online-logged-user-last-fm/online-logged-user-last-fm.service';
import { Injectable } from '@angular/core';
import { LastFmSimpleTrack } from 'last-fm';
import { forkJoin, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
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
    private scrobbleService: ScrobbleService
  ) {}

  synchronizeScrobbles(): Observable<number> {
    return this.isOnlineAndLogged().pipe(
      switchMap(() => this.getScrobbleCache()),
      switchMap((tracks) => this.scrobbleTracksInCache(tracks)),
      tap(() => this.removeTracksInCache()),
      map((scrobbledTracks) => scrobbledTracks.length)
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
