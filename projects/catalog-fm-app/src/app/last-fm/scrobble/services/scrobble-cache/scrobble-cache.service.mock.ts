import { ScrobbleResponseType } from '@/last-fm/scrobble/enums/scrobble-response-type';
import { of } from 'rxjs';
import { ScrobbleCacheService } from './scrobble-cache.service';

export const makeScrobbleCacheService = (): jasmine.SpyObj<ScrobbleCacheService> => {
  return jasmine.createSpyObj<ScrobbleCacheService>('ScrobbleCacheService', {
    scrobble: of(ScrobbleResponseType.Cache),
  });
};
