import { CorrectedObject } from '@/shared/models/corrected-object';

export interface LastFmScrobbleResponse {
  scrobbles: {
    '@attr': {
      accepted: number;
      ignored: number;
    };
    scrobble: {
      album: CorrectedObject;
      albumArtist: CorrectedObject;
      artist: CorrectedObject;
      track: CorrectedObject;
      ignoredMessage: {
        code: string;
        '#text': string;
      };
      timestamp: string;
    };
  };
}
