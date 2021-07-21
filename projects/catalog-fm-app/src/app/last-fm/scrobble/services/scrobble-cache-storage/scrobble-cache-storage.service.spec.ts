import { fakeAsync, tick } from '@angular/core/testing';
import { MOCK_LAST_FM_SIMPLE_TRACK } from 'last-fm';
import { makeStorageServiceSpy } from 'projects/catalog-fm-app/src/test/last-fm/services/storage.service.mock';
import { mockLastFmSimpleTrackScrobble } from '../../bulk-scrobble/mocks/last-fm-simple-track-scrobble.mock';

import { ScrobbleCacheStorageService } from './scrobble-cache-storage.service';

const makeSut = () => {
  const storageServiceSpy = makeStorageServiceSpy();
  storageServiceSpy.getItem.and.returnValue(Promise.resolve(mockLastFmSimpleTrackScrobble()));
  storageServiceSpy.setItem.and.returnValue(Promise.resolve());
  const service = new ScrobbleCacheStorageService(storageServiceSpy);
  return { service, storageServiceSpy };
};

describe('ScrobbleCacheStorageService', () => {
  it('should be created', () => {
    const { service } = makeSut();
    expect(service).toBeTruthy();
  });

  it('should get scrobbles', fakeAsync(() => {
    const { service, storageServiceSpy } = makeSut();
    service.getScrobbles().subscribe((scrobbles) => {
      tick();
      expect(storageServiceSpy.getItem).toHaveBeenCalledOnceWith('scrobbles');
      expect(scrobbles).toEqual(mockLastFmSimpleTrackScrobble());
    });
  }));

  it('should add track to scrobble cache', fakeAsync(() => {
    const { service, storageServiceSpy } = makeSut();
    service.addScrobble(MOCK_LAST_FM_SIMPLE_TRACK).subscribe((scrobbles) => {
      tick();
      const expectedResult = [...mockLastFmSimpleTrackScrobble(), MOCK_LAST_FM_SIMPLE_TRACK];
      expect(storageServiceSpy.setItem).toHaveBeenCalledOnceWith('scrobbles', expectedResult);
      expect(scrobbles).toEqual(expectedResult);
    });
  }));

  it('should add track to empty scrobble cache', fakeAsync(() => {
    const { service, storageServiceSpy } = makeSut();
    storageServiceSpy.getItem.and.returnValue(Promise.resolve(undefined));
    service.addScrobble(MOCK_LAST_FM_SIMPLE_TRACK).subscribe((scrobbles) => {
      tick();
      const expectedResult = [MOCK_LAST_FM_SIMPLE_TRACK];
      expect(storageServiceSpy.setItem).toHaveBeenCalledOnceWith('scrobbles', expectedResult);
      expect(scrobbles).toEqual(expectedResult);
    });
  }));

  it('should clear', () => {
    const { service, storageServiceSpy } = makeSut();
    service.clear();
    expect(storageServiceSpy.removeItem).toHaveBeenCalled();
  });
});
