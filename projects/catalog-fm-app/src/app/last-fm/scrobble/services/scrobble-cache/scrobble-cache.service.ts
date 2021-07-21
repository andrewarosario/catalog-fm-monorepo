import { Injectable } from '@angular/core';
import { LastFmSimpleTrack } from 'last-fm';
import { Observable } from 'rxjs';
import { ScrobbleResponseType } from '../../enums/scrobble-response-type';
import { Scrobble } from '../../interfaces/scrobble';
import { mapTo } from 'rxjs/operators';
import { ScrobbleCacheStorageService } from '../scrobble-cache-storage/scrobble-cache-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ScrobbleCacheService implements Scrobble {
  constructor(private scrobbleCacheStorageService: ScrobbleCacheStorageService) {}

  scrobble(track: LastFmSimpleTrack, timestamp?: number): Observable<ScrobbleResponseType> {
    return this.scrobbleCacheStorageService
      .addScrobble(track)
      .pipe(mapTo(ScrobbleResponseType.Cache));
  }
}
