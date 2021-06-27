import { LastFmAlbumMatch } from '@/album/models/last-fm-album-match';
import { LastFmArtistMatch } from './last-fm-artist-match';

export interface LastFmArtist extends LastFmArtistMatch {
  id?: string;
  albums: LastFmAlbumMatch[];
  playcount: string;
  stats: {
    listeners: string;
    playcount: string;
  };
  wiki?: {
    published: string;
    summary: string;
    content: string;
    links: {
      '#text': string;
      href: string;
      rel: string;
    }[];
  };
  tags: any;
  ontour: string;
  bio: string;
}
