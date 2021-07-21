import { Injectable } from '@angular/core';
import { StorageService } from 'catalog-fm-utils';
import { LastFmSimpleTrack } from 'last-fm';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScrobbleCacheStorageService {
  constructor(private storageService: StorageService) {}

  getScrobbles(): Observable<LastFmSimpleTrack[]> {
    return from(this.storageService.getItem<LastFmSimpleTrack[]>('scrobbles'));
  }

  addScrobble(track: LastFmSimpleTrack): Observable<LastFmSimpleTrack[]> {
    return this.getScrobbles().pipe(
      map((scrobbles) => {
        const newCache = [...(scrobbles || []), track];
        this.storageService.setItem('scrobbles', newCache);
        return newCache;
      })
    );
  }

  clear(): void {
    this.storageService.removeItem('scrobbles');
  }
}
