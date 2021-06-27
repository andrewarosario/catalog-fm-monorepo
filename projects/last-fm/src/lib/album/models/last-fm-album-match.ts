import { Images } from '@/shared/models/images';

export interface LastFmAlbumMatch {
  type: 'album';
  name: string;
  artist: string | any;
  url: string;
  mbid: string;
  image?: Images;
}
