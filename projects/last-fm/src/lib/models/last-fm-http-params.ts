export type LastFmData = { [key: string]: string };

export interface LastFmHttpParams {
  method: string;
  data?: LastFmData;
  encode?: string[];
}
