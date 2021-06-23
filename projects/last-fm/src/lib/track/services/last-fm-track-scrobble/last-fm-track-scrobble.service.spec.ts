import { LastFmMethod } from '@/api/enums/last-fm-method';
import { makeLastFmHttpSpy } from '@/api/services/last-fm-http/last-fm-http.service.mock';
import { MOCK_LAST_FM_SIMPLE_TRACK } from '@/track/mocks/last-fm-simple-track.mock';
import { LastFmTrackScrobbleParams } from '@/track/interfaces/last-fm-track-scrobble';
import { MOCK_LAST_FM_SCROBBLE_RESPONSE } from '@/track/mocks/last-fm-scrobble-response.mock';
import { LastFmTrackScrobbleService } from './last-fm-track-scrobble.service';

const MOCK_LAST_FM_TRACK_SCROBBLE_PARAMS: LastFmTrackScrobbleParams = {
  ...MOCK_LAST_FM_SIMPLE_TRACK,
  sk: '999',
  timestamp: '000',
};

const makeSut = () => {
  const lastFmHttp = makeLastFmHttpSpy(MOCK_LAST_FM_SCROBBLE_RESPONSE);
  const service = new LastFmTrackScrobbleService(lastFmHttp);
  return { service, lastFmHttp };
};

describe('LastFmTrackScrobbleService', () => {
  it('should be created', () => {
    const { service } = makeSut();
    expect(service).toBeTruthy();
  });

  it('should call LastFmHttp.post with correct values', () => {
    const { service, lastFmHttp } = makeSut();
    service.scrobble(MOCK_LAST_FM_TRACK_SCROBBLE_PARAMS).subscribe();
    expect(lastFmHttp.post).toHaveBeenCalledOnceWith({
      method: LastFmMethod.TrackScrobble,
      data: { ...MOCK_LAST_FM_TRACK_SCROBBLE_PARAMS },
      encode: ['album', 'artist', 'track'],
    });
  });

  it('should return the right data from scrobble', () => {
    const { service } = makeSut();
    service.scrobble(MOCK_LAST_FM_TRACK_SCROBBLE_PARAMS).subscribe((res) => {
      expect(res).toEqual(MOCK_LAST_FM_SCROBBLE_RESPONSE);
    });
  });
});
