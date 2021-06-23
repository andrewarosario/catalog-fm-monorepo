import { Images } from '@/shared/models/images';

export interface LastFmTrackMatch {
  type: 'song';
  name: string;
  artist: string | any;
  url: string;
  streamable: {
    '#text': '0' | '1';
    fulltrack: '0' | '1';
  };
  listeners: string;
  mbid: string;
  image?: Images;
}
