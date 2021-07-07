import { LastFmSimpleTrack } from 'last-fm';

export const mockLastFmSimpleTrackScrobble = (): LastFmSimpleTrack[] => [
  { artist: 'Artist 1', track: 'Track 1', album: 'Album 1' },
  { artist: 'Artist 2', track: 'Track 2', album: 'Album 2' },
  { artist: 'Artist 3', track: 'Track 3', album: '' },
];
