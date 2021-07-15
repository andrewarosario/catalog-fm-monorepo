import { fakeAsync, tick } from '@angular/core/testing';
import { MOCK_LAST_FM_SIMPLE_TRACK } from 'last-fm';
import { makeStorageServiceSpy } from 'projects/catalog-fm-app/src/test/last-fm/services/storage.service.mock';
import { mockLastFmSimpleTrackScrobble } from '../../bulk-scrobble/mocks/last-fm-simple-track-scrobble.mock';
import { ScrobbleResponseType } from '../../enums/scrobble-response-type';

import { ScrobbleCacheService } from './scrobble-cache.service';

const makeSut = () => {
  const storageServiceSpy = makeStorageServiceSpy();
  storageServiceSpy.getItem.and.returnValue(Promise.resolve(mockLastFmSimpleTrackScrobble()));
  storageServiceSpy.setItem.and.returnValue(Promise.resolve());
  const service = new ScrobbleCacheService(storageServiceSpy);
  return { service, storageServiceSpy };
};

describe('ScrobbleCacheService', () => {
  it('should be created', () => {
    const { service } = makeSut();
    expect(service).toBeTruthy();
  });

  it('should call storageService.getItem with correct values', fakeAsync(() => {
    const { service, storageServiceSpy } = makeSut();
    service.scrobble(MOCK_LAST_FM_SIMPLE_TRACK).subscribe(() => {
      tick();
      expect(storageServiceSpy.getItem).toHaveBeenCalledWith('scrobbles');
    });
  }));

  it('should call storageService.setItem with correct values', fakeAsync(() => {
    const { service, storageServiceSpy } = makeSut();
    service.scrobble(MOCK_LAST_FM_SIMPLE_TRACK).subscribe(() => {
      tick();
      expect(storageServiceSpy.setItem).toHaveBeenCalledWith('scrobbles', [
        ...mockLastFmSimpleTrackScrobble(),
        MOCK_LAST_FM_SIMPLE_TRACK,
      ]);
    });
  }));

  it('should call storageService.setItem with correct values when there is no scrobbles in cache', fakeAsync(() => {
    const { service, storageServiceSpy } = makeSut();
    storageServiceSpy.getItem.and.returnValue(Promise.resolve(undefined));
    service.scrobble(MOCK_LAST_FM_SIMPLE_TRACK).subscribe(() => {
      tick();
      expect(storageServiceSpy.setItem).toHaveBeenCalledWith('scrobbles', [
        MOCK_LAST_FM_SIMPLE_TRACK,
      ]);
    });
  }));

  it('should return the correct response type from scrobble', fakeAsync(() => {
    const { service } = makeSut();
    service.scrobble(MOCK_LAST_FM_SIMPLE_TRACK).subscribe((response) => {
      tick();
      expect(response).toBe(ScrobbleResponseType.Cache);
    });
  }));
});
