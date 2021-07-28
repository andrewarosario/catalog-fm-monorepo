import { OnlineLoggedUserLastFmService } from '@/auth/services/online-logged-user-last-fm/online-logged-user-last-fm.service';
import { UiMessageService } from 'catalog-fm-ui';
import { of } from 'rxjs';
import { mockLastFmSimpleTrackScrobble } from '../../bulk-scrobble/mocks/last-fm-simple-track-scrobble.mock';
import { makeScrobbleCacheStorageServiceSpy } from '../scrobble-cache-storage/scrobble-cache-storage.service.mock';
import { makeScrobbleService } from '../scrobble/scrobble.service.mock';

import { ScrobbleSynchronizationService } from './scrobble-synchronization.service';

const makeSut = () => {
  const onlineLoggedUserLastFmServiceSpy = jasmine.createSpyObj<OnlineLoggedUserLastFmService>(
    'OnlineLoggedUserLastFmService',
    {
      isOnlineAndLogged: of(true),
    }
  );
  const scrobbleCacheStorageServiceSpy = makeScrobbleCacheStorageServiceSpy();
  const scrobbleServiceSpy = makeScrobbleService();

  const service = new ScrobbleSynchronizationService(
    onlineLoggedUserLastFmServiceSpy,
    scrobbleCacheStorageServiceSpy,
    scrobbleServiceSpy,
    new UiMessageService()
  );
  return {
    service,
    onlineLoggedUserLastFmServiceSpy,
    scrobbleCacheStorageServiceSpy,
    scrobbleServiceSpy,
  };
};
describe('ScrobbleSynchronizationService', () => {
  it('should be created', () => {
    const { service } = makeSut();
    expect(service).toBeTruthy();
  });

  it('should not emit value when user is not logged or offline', () => {
    const {
      service,
      onlineLoggedUserLastFmServiceSpy,
      scrobbleCacheStorageServiceSpy,
      scrobbleServiceSpy,
    } = makeSut();
    onlineLoggedUserLastFmServiceSpy.isOnlineAndLogged.and.returnValue(of(false));

    service.synchronizeScrobbles();

    expect(scrobbleCacheStorageServiceSpy.getScrobbles).not.toHaveBeenCalled();
    expect(scrobbleServiceSpy.scrobble).not.toHaveBeenCalled();
    expect(scrobbleCacheStorageServiceSpy.clear).not.toHaveBeenCalled();
  });

  it('should not emit value when there is no scrobble in cache', () => {
    const { service, scrobbleCacheStorageServiceSpy, scrobbleServiceSpy } = makeSut();

    scrobbleCacheStorageServiceSpy.getScrobbles.and.returnValue(of([]));

    service.synchronizeScrobbles();

    expect(scrobbleCacheStorageServiceSpy.getScrobbles).toHaveBeenCalled();
    expect(scrobbleServiceSpy.scrobble).not.toHaveBeenCalled();
    expect(scrobbleCacheStorageServiceSpy.clear).not.toHaveBeenCalled();
  });

  it('should emit scrobbled tracks length when there is scrobble in cache', () => {
    const { service, scrobbleCacheStorageServiceSpy, scrobbleServiceSpy } = makeSut();
    const tracksLength = mockLastFmSimpleTrackScrobble().length;

    service.synchronizeScrobbles();

    expect(scrobbleCacheStorageServiceSpy.getScrobbles).toHaveBeenCalled();
    expect(scrobbleServiceSpy.scrobble).toHaveBeenCalledTimes(tracksLength);
    expect(scrobbleCacheStorageServiceSpy.clear).toHaveBeenCalled();
  });
});
