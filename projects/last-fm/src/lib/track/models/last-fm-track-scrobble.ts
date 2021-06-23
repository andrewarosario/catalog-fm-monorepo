import { LastFmSimpleTrack } from './last-fm-simple-track';

export interface LastFmTrackScrobble extends LastFmSimpleTrack {
  timestamp: string;
  sk: string;
}
