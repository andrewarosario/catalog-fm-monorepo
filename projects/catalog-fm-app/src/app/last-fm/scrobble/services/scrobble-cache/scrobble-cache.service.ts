import { StorageService } from 'catalog-fm-utils';
import { Injectable } from '@angular/core';
import { LastFmSimpleTrack } from 'last-fm';
import { from, Observable } from 'rxjs';
import { ScrobbleResponseType } from '../../enums/scrobble-response-type';
import { Scrobble } from '../../interfaces/scrobble';
import { mapTo, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScrobbleCacheService implements Scrobble {
  constructor(private storageService: StorageService) {}
  scrobble(track: LastFmSimpleTrack, timestamp?: number): Observable<ScrobbleResponseType> {
    const scrobblesInCache$ = from(this.storageService.getItem<LastFmSimpleTrack[]>('scrobbles'));

    return scrobblesInCache$.pipe(
      tap((scrobbles) => this.storageService.setItem('scrobbles', [...(scrobbles || []), track])),
      mapTo(ScrobbleResponseType.Cache)
    );
  }
}
