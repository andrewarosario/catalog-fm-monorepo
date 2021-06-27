import { Images } from '@/shared/models/images';

export interface LastFmArtistMatch {
  type: 'artist';
  name: string;
  url: string;
  streamable: '0' | '1';
  mbid: string;
  image?: Images;
}
