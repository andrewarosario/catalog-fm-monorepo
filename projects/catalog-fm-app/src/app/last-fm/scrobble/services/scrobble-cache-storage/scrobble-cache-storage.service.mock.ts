import { of } from 'rxjs';
import { mockLastFmSimpleTrackScrobble } from '../../bulk-scrobble/mocks/last-fm-simple-track-scrobble.mock';
import { ScrobbleCacheStorageService } from './scrobble-cache-storage.service';

export const makeScrobbleCacheStorageServiceSpy =
  (): jasmine.SpyObj<ScrobbleCacheStorageService> => {
    return jasmine.createSpyObj<ScrobbleCacheStorageService>('ScrobbleCacheStorageService', {
      getScrobbles: of(mockLastFmSimpleTrackScrobble()),
      addScrobble: of(mockLastFmSimpleTrackScrobble()),
      clear: undefined,
    });
  };
