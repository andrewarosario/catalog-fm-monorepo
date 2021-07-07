import { Injectable } from '@angular/core';
import { LastFmSimpleTrack } from 'last-fm';

@Injectable({
  providedIn: 'root'
})
export class BulkScrobbleConverter {

  convert(text: string): LastFmSimpleTrack[] {
    return this.convertTextToArrayScrobble(text)
      .map(this.convertLineToTrackScrobble);
  }

  private convertTextToArrayScrobble(text: string): string[] {
    return text.split(/\n/);
  }

  private convertLineToTrackScrobble(line: string): LastFmSimpleTrack {
    const [ artist, track, album = '' ] = line.split('-');
    return {
      artist,
      track,
      album
    };
  }
}
