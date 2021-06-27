import { LastFmTrackMatch } from '@/track/models/last-fm-track-match';
import { LastFmAlbumMatch } from './last-fm-album-match';

export interface LastfmAlbum extends LastFmAlbumMatch {
  id?: string;
  artist: string | any;
  playcount: string;
  tracks: {
    track: LastFmTrackMatch[];
  };
  tags: {
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
}
