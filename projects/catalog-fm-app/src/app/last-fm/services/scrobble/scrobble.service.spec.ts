import { makeAuthUserStore } from '@/core/auth/store/auth-user.store.mock';
import { MOCK_LAST_FM_SCROBBLE_RESPONSE, MOCK_LAST_FM_SIMPLE_TRACK } from 'last-fm';
import { LastFmTrackScrobbleService } from 'last-fm';
import { of } from 'rxjs';

import { ScrobbleService } from './scrobble.service';
import { DateHelper } from 'catalog-fm-utils';
import { mockAuthUser } from '@/core/auth/mocks/auth-user.mock';
import { ScrobbleResponseType } from '@/last-fm/scrobble/enums/scrobble-response-type';

const makeLastFmTrackScrobbleService = (): jasmine.SpyObj<LastFmTrackScrobbleService> => {
  return jasmine.createSpyObj<LastFmTrackScrobbleService>('LastFmTrackScrobbleService', {
    scrobble: of(MOCK_LAST_FM_SCROBBLE_RESPONSE),
  });
};

const makeDateHelper = () => {
  return jasmine.createSpyObj<DateHelper>(
    'DateHelper',
    {},
    {
      unixTimestamp: 123456,
    }
  );
};

const makeSut = () => {
  const authUserStoreSpy = makeAuthUserStore();
  const lastFmTrackScrobbleServiceSpy = makeLastFmTrackScrobbleService();
  const dateHelperSpy = makeDateHelper();
  const service = new ScrobbleService(
    authUserStoreSpy,
    lastFmTrackScrobbleServiceSpy,
    dateHelperSpy
  );
  return { service, authUserStoreSpy, lastFmTrackScrobbleServiceSpy };
};

describe('ScrobbleService', () => {
  it('should be created', () => {
    const { service } = makeSut();
    expect(service).toBeTruthy();
  });

  it('should scrobble without timestamp', () => {
    const { service, lastFmTrackScrobbleServiceSpy } = makeSut();
    service.scrobble(MOCK_LAST_FM_SIMPLE_TRACK).subscribe(() => {
      expect(lastFmTrackScrobbleServiceSpy.scrobble).toHaveBeenCalledWith({
        ...MOCK_LAST_FM_SIMPLE_TRACK,
        sk: mockAuthUser().lastFmSession.key,
        timestamp: String(123456),
      });
    });
  });

  it('should scrobble with timestamp', () => {
    const { service, lastFmTrackScrobbleServiceSpy } = makeSut();
    service.scrobble(MOCK_LAST_FM_SIMPLE_TRACK, 999999).subscribe(() => {
      expect(lastFmTrackScrobbleServiceSpy.scrobble).toHaveBeenCalledWith({
        ...MOCK_LAST_FM_SIMPLE_TRACK,
        sk: mockAuthUser().lastFmSession.key,
        timestamp: String(999999),
      });
    });
  });

  it('should return the correct response type from scrobble', () => {
    const { service } = makeSut();
    service.scrobble(MOCK_LAST_FM_SIMPLE_TRACK).subscribe((response) => {
      expect(response).toEqual(ScrobbleResponseType.Success);
    });
  });
});
