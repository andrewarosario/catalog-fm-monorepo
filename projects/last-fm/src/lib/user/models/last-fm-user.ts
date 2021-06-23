import { Images } from '@/shared/models/images';

export interface LastfmUser {
  id?: string;
  type: 'user';
  name: string;
  realname: string;
  url: string;
  image: Images;
  country: string;
  age: string;
  gender: 'm' | 'f';
  subscriber: '0' | '1';
  playcount: string;
  playlists: string;
  bootstrap: string;
  registered: {
    unixtime: string;
    '#text': string;
  };
}
