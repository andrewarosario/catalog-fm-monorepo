import { MOCK_LAST_FM_SCROBBLE_RESPONSE } from 'last-fm';
import { of } from 'rxjs';
import { ScrobbleService } from './scrobble.service';

export const makeScrobbleService = (): jasmine.SpyObj<ScrobbleService> => {
  return jasmine.createSpyObj<ScrobbleService>('ScrobbleService', {
    scrobble: of(MOCK_LAST_FM_SCROBBLE_RESPONSE),
  });
};
