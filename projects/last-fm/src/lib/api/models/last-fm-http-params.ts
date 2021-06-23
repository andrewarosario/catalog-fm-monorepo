import { LastFmMethod } from '../enums/last-fm-method';

export type LastFmData = { [key: string]: string };

export interface LastFmHttpParams {
  method: LastFmMethod;
  data?: LastFmData;
  encode?: string[];
}
