import { ScrobbleService } from '@/last-fm/services/scrobble/scrobble.service';
import { Injectable } from '@angular/core';
import { LastFmScrobbleResponse, LastFmSimpleTrack } from 'last-fm';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BulkScrobbleConverter } from '../bulk-scrobble-converter/bulk-scrobble-converter.service';

@Injectable({
  providedIn: 'root',
})
export class BulkScrobbleService {
  constructor(
    private bulkScrobbleConverter: BulkScrobbleConverter,
    private scrobbleService: ScrobbleService
  ) {}

  public scrobble(text: string): Observable<LastFmScrobbleResponse> {
    const tracks = this.bulkScrobbleConverter.convert(text);
    return this.scrobbleTracks(tracks);
  }

  private scrobbleTracks(tracks: LastFmSimpleTrack[]): Observable<LastFmScrobbleResponse> {
    const tracksToScrobble = tracks.map((track) => this.scrobbleService.scrobble(track));
    return forkJoin(tracksToScrobble).pipe(map((response) => response[0]));
  }
}
