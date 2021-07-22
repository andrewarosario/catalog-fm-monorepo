import { OnlineLoggedUserLastFmService } from '@/core/auth/services/online-logged-user-last-fm/online-logged-user-last-fm.service';
import { of } from 'rxjs';
import { mockLastFmSimpleTrackScrobble } from '../../bulk-scrobble/mocks/last-fm-simple-track-scrobble.mock';
import { makeScrobbleCacheStorageServiceSpy } from '../scrobble-cache-storage/scrobble-cache-storage.service.mock';
import { makeScrobbleService } from '../scrobble/scrobble.service.mock';

import { ScrobbleOnlineSyncService } from './scrobble-online-sync.service';

const makeSut = () => {
  const onlineLoggedUserLastFmServiceSpy = jasmine.createSpyObj<OnlineLoggedUserLastFmService>(
    'OnlineLoggedUserLastFmService',
    {
      isOnlineAndLogged: of(true),
    }
  );
  const scrobbleCacheStorageServiceSpy = makeScrobbleCacheStorageServiceSpy();
  const scrobbleServiceSpy = makeScrobbleService();

  const service = new ScrobbleOnlineSyncService(
    onlineLoggedUserLastFmServiceSpy,
    scrobbleCacheStorageServiceSpy,
    scrobbleServiceSpy
  );
  return {
    service,
    onlineLoggedUserLastFmServiceSpy,
    scrobbleCacheStorageServiceSpy,
    scrobbleServiceSpy,
  };
};
describe('ScrobbleOnlineSyncService', () => {
  it('should be created', () => {
    const { service } = makeSut();
    expect(service).toBeTruthy();
  });

  fit('should not emit value when user is not logged', () => {
    const {
      service,
      onlineLoggedUserLastFmServiceSpy,
      scrobbleCacheStorageServiceSpy,
      scrobbleServiceSpy,
    } = makeSut();
    onlineLoggedUserLastFmServiceSpy.isOnlineAndLogged.and.returnValue(of(false));

    let emmitedValue;
    service.synchronizeScrobbles().subscribe((response) => (emmitedValue = response));

    expect(emmitedValue).toBeUndefined();
    expect(scrobbleCacheStorageServiceSpy.getScrobbles).not.toHaveBeenCalled();
    expect(scrobbleCacheStorageServiceSpy.clear).not.toHaveBeenCalled();
    expect(scrobbleServiceSpy.scrobble).not.toHaveBeenCalled();
  });

  fit('should not emit value when there is no scrobble in cache', () => {
    const { service, scrobbleCacheStorageServiceSpy, scrobbleServiceSpy } = makeSut();

    scrobbleCacheStorageServiceSpy.getScrobbles.and.returnValue(of([]));

    let emmitedValue;
    service.synchronizeScrobbles().subscribe((response) => (emmitedValue = response));

    expect(emmitedValue).toBeUndefined();
    expect(scrobbleCacheStorageServiceSpy.getScrobbles).toHaveBeenCalled();
    expect(scrobbleCacheStorageServiceSpy.clear).not.toHaveBeenCalled();
    expect(scrobbleServiceSpy.scrobble).not.toHaveBeenCalled();
  });

  fit('should emit value when there is scrobble in cache', () => {
    const { service, scrobbleCacheStorageServiceSpy, scrobbleServiceSpy } = makeSut();
    const numberOfTracks = mockLastFmSimpleTrackScrobble().length;

    let emmitedValue;
    service.synchronizeScrobbles().subscribe((response) => (emmitedValue = response));

    expect(emmitedValue).toBe(numberOfTracks);
    expect(scrobbleCacheStorageServiceSpy.getScrobbles).toHaveBeenCalled();
    expect(scrobbleCacheStorageServiceSpy.clear).toHaveBeenCalled();
    expect(scrobbleServiceSpy.scrobble).toHaveBeenCalledTimes(numberOfTracks);
  });
});
