import { Images } from '@/shared/models/images';
import { LastFmTrackMatch } from './last-fm-track-match';

export interface LastFmTrack extends LastFmTrackMatch {
  id?: string;
  duration: string;
  playcount: string;
  artist: {
    name: string;
    mbid: string;
    url: string;
  };
  album: {
    artist: string;
    title: string;
    mbid: string;
    url: string;
    image: Images;
    '@attr': {
      position: string;
    };
  };
  toptags: {
    tag: {
      name: string;
      url: string;
    }[];
  };
  wiki?: {
    published: string;
    summary: string;
    content: string;
  };
  date?: {
    '#text': string;
    uts: string;
  };
  '@attr'?: {
    nowplaying: string;
  };
}
