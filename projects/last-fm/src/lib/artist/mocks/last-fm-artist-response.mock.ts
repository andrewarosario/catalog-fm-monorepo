import { LastFmArtistResponse } from '../interfaces/last-fm-artist-info';

export const MOCK_LAST_FM_ARTIST_RESPONSE: LastFmArtistResponse = {
  artist: {
    name: 'Porcupine Tree',
    ontour: '0',
    playcount: '89000',
    streamable: '1',
    bio: 'Artist bio',
    tags: 'progressive rock',
    mbid: 'id',
    type: 'artist',
    url: 'http://last.fm/',
    albums: [
      {
        artist: 'Porcupine Tree',
        name: 'In Absentia',
        type: 'album',
        mbid: 'id',
        url: 'http://last.fm/',
      },
    ],
    stats: {
      listeners: '20000',
      playcount: '50000',
    },
  },
};
