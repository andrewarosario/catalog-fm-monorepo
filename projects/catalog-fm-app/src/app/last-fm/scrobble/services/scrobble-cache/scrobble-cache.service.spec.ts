import { MOCK_LAST_FM_SIMPLE_TRACK } from 'last-fm';
import { ScrobbleResponseType } from '../../enums/scrobble-response-type';
import { makeScrobbleCacheStorageServiceSpy } from '../scrobble-cache-storage/scrobble-cache-storage.service.mock';

import { ScrobbleCacheService } from './scrobble-cache.service';

const makeSut = () => {
  const scrobbleCacheStorageServiceSpy = makeScrobbleCacheStorageServiceSpy();
  const service = new ScrobbleCacheService(scrobbleCacheStorageServiceSpy);
  return { service, scrobbleCacheStorageServiceSpy };
};

describe('ScrobbleCacheService', () => {
  it('should be created', () => {
    const { service } = makeSut();
    expect(service).toBeTruthy();
  });

  it('should call scrobbleCacheStorageService.addScrobbles with correct values', () => {
    const { service, scrobbleCacheStorageServiceSpy } = makeSut();
    service.scrobble(MOCK_LAST_FM_SIMPLE_TRACK).subscribe(() => {
      expect(scrobbleCacheStorageServiceSpy.addScrobble).toHaveBeenCalledWith(
        MOCK_LAST_FM_SIMPLE_TRACK
      );
    });
  });

  it('should return the correct response type from scrobble', () => {
    const { service } = makeSut();
    service.scrobble(MOCK_LAST_FM_SIMPLE_TRACK).subscribe((response) => {
      expect(response).toBe(ScrobbleResponseType.Cache);
    });
  });
});
