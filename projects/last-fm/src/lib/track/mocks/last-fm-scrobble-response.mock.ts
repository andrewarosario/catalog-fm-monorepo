import { MOCK_CORRECTED_OBJECT } from '../../shared/mocks/corrected-object.mock';
import { LastFmScrobbleResponse } from '../../user/models/last-fm-scrobble-response';

export const MOCK_LAST_FM_SCROBBLE_RESPONSE: LastFmScrobbleResponse = {
  scrobbles: {
    '@attr': {
      accepted: 1,
      ignored: 0,
    },
    scrobble: {
      album: MOCK_CORRECTED_OBJECT,
      albumArtist: MOCK_CORRECTED_OBJECT,
      artist: MOCK_CORRECTED_OBJECT,
      track: MOCK_CORRECTED_OBJECT,
      ignoredMessage: {
        code: '1',
        '#text': 'any_text',
      },
      timestamp: '000',
    },
  },
};
