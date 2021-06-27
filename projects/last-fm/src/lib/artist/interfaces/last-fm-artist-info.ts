import { Observable } from 'rxjs';
import { LastFmArtist } from '../models/last-fm-artist';

export interface LastFmArtistResponse {
  artist: LastFmArtist;
}

export interface LastFmArtistInfo {
  getInfo(artist: string): Observable<LastFmArtistResponse>;
}
