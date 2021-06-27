import { LastFmUserResponse } from '../interfaces/last-fm-user-info';

export const MOCK_LAST_FM_USER_RESPONSE: LastFmUserResponse = {
  user: {
    age: '20',
    country: 'brazil',
    gender: 'f',
    name: 'maria',
    playcount: '2550',
    playlists: '',
    realname: 'Maria',
    subscriber: '0',
    url: 'https://last.fm/user/maria',
    type: 'user',
    bootstrap: '',
    id: '954',
    registered: {
      unixtime: '000',
      '#text': '01 Jan 2022',
    },
    image: [
      { '#text': 'small', size: 'small' },
      { '#text': 'medium', size: 'medium' },
      { '#text': 'large', size: 'large' },
      { '#text': 'extralarge', size: 'extralarge' },
    ],
  },
};
