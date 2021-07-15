import { OnlineLoggedUserLastFmSyncService } from '@/core/auth/services/online-logged-user-last-fm-sync/online-logged-user-last-fm-sync.service';
import { MOCK_LAST_FM_SIMPLE_TRACK } from 'last-fm';
import { ScrobbleResponseType } from '../../enums/scrobble-response-type';
import { makeScrobbleCacheService } from '../scrobble-cache/scrobble-cache.service.mock';
import { makeScrobbleService } from '../scrobble/scrobble.service.mock';

import { ScrobbleStrategyService } from './scrobble-strategy.service';

const makeOnlineLoggedUserLastFmSyncService = (isOnlineAndLogged: boolean) => {
  return jasmine.createSpyObj<OnlineLoggedUserLastFmSyncService>(
    'OnlineLoggedUserLastFmSyncService',
    {
      isOnlineAndLogged,
    }
  );
};

const makeSut = (isOnlineAndLogged = true) => {
  const onlineLoggedUserLastFmSyncServiceSpy =
    makeOnlineLoggedUserLastFmSyncService(isOnlineAndLogged);
  const scrobbleServiceSpy = makeScrobbleService();
  const scrobbleCacheServiceSpy = makeScrobbleCacheService();
  const service = new ScrobbleStrategyService(
    onlineLoggedUserLastFmSyncServiceSpy,
    scrobbleServiceSpy,
    scrobbleCacheServiceSpy
  );

  return { service, scrobbleServiceSpy, scrobbleCacheServiceSpy };
};

describe('ScrobbleStrategyService', () => {
  it('should be created', () => {
    const { service } = makeSut();
    expect(service).toBeTruthy();
  });

  it('should scrobble when online', () => {
    const { service, scrobbleServiceSpy, scrobbleCacheServiceSpy } = makeSut();
    service.scrobble(MOCK_LAST_FM_SIMPLE_TRACK, 123).subscribe((response) => {
      expect(scrobbleCacheServiceSpy.scrobble).not.toHaveBeenCalled();
      expect(scrobbleServiceSpy.scrobble).toHaveBeenCalledWith(MOCK_LAST_FM_SIMPLE_TRACK, 123);
      expect(response).toBe(ScrobbleResponseType.Success);
    });
  });

  it('should cache scrobble when offline', () => {
    const { service, scrobbleServiceSpy, scrobbleCacheServiceSpy } = makeSut(false);
    service.scrobble(MOCK_LAST_FM_SIMPLE_TRACK, 123).subscribe((response) => {
      expect(scrobbleServiceSpy.scrobble).not.toHaveBeenCalled();
      expect(scrobbleCacheServiceSpy.scrobble).toHaveBeenCalledWith(MOCK_LAST_FM_SIMPLE_TRACK, 123);
      expect(response).toBe(ScrobbleResponseType.Cache);
    });
  });
});
