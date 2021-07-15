import { ScrobbleResponseType } from '@/last-fm/scrobble/enums/scrobble-response-type';
import { ScrobbleStrategyService } from '@/last-fm/scrobble/services/scrobble-strategy/scrobble-strategy.service';
import { ScrobbleService } from '@/last-fm/scrobble/services/scrobble/scrobble.service';
import { Injectable } from '@angular/core';
import { LastFmSimpleTrack } from 'last-fm';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BulkScrobbleConverter } from '../bulk-scrobble-converter/bulk-scrobble-converter.service';

@Injectable({
  providedIn: 'root',
})
export class BulkScrobbleService {
  constructor(
    private bulkScrobbleConverter: BulkScrobbleConverter,
    private scrobbleService: ScrobbleStrategyService
  ) {}

  public scrobble(text: string): Observable<ScrobbleResponseType> {
    const tracks = this.bulkScrobbleConverter.convert(text);
    return this.scrobbleTracks(tracks);
  }

  private scrobbleTracks(tracks: LastFmSimpleTrack[]): Observable<ScrobbleResponseType> {
    const tracksToScrobble = tracks.map((track) => this.scrobbleService.scrobble(track));
    return forkJoin(tracksToScrobble).pipe(map((response) => response[0]));
  }
}
