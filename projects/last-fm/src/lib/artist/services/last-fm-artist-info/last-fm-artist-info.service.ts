import { LastFmMethod } from '@/api/enums/last-fm-method';
import { LastFmHttpParams } from '@/api/models/last-fm-http-params';
import { LastFmHttp } from '@/api/services/last-fm-http/last-fm-http.service';
import { LastFmArtistInfo, LastFmArtistResponse } from '@/artist/interfaces/last-fm-artist-info';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LastFmArtistInfoService implements LastFmArtistInfo {
  constructor(private lastFmHttp: LastFmHttp) {}

  getInfo(artist: string): Observable<LastFmArtistResponse> {
    const params = this.makeParams(artist);
    return this.lastFmHttp.get(params);
  }

  private makeParams(artist: string): LastFmHttpParams {
    return {
      method: LastFmMethod.ArtistGetInfo,
      data: { artist },
      encode: ['artist'],
    };
  }
}
