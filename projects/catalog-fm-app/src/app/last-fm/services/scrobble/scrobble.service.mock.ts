import { ScrobbleResponseType } from '@/last-fm/scrobble/enums/scrobble-response-type';
import { of } from 'rxjs';
import { ScrobbleService } from './scrobble.service';

export const makeScrobbleService = (): jasmine.SpyObj<ScrobbleService> => {
  return jasmine.createSpyObj<ScrobbleService>('ScrobbleService', {
    scrobble: of(ScrobbleResponseType.Success),
  });
};
