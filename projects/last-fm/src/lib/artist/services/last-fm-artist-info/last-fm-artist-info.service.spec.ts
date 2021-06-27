import { LastFmMethod } from '@/api/enums/last-fm-method';
import { makeLastFmHttpSpy } from '@/api/services/last-fm-http/last-fm-http.service.mock';
import { MOCK_LAST_FM_ARTIST_RESPONSE } from '@/artist/mocks/last-fm-artist-response.mock';

import { LastFmArtistInfoService } from './last-fm-artist-info.service';

const makeSut = () => {
  const lastFmHttp = makeLastFmHttpSpy(MOCK_LAST_FM_ARTIST_RESPONSE);
  const service = new LastFmArtistInfoService(lastFmHttp);
  return { service, lastFmHttp };
};

describe('LastFmArtistInfoService', () => {
  it('should be created', () => {
    const { service } = makeSut();
    expect(service).toBeTruthy();
  });

  it('should call LastFmHttp.get with correct values', () => {
    const { service, lastFmHttp } = makeSut();
    service.getInfo('artist').subscribe();
    expect(lastFmHttp.get).toHaveBeenCalledOnceWith({
      method: LastFmMethod.ArtistGetInfo,
      data: { artist: 'artist' },
      encode: ['artist'],
    });
  });

  it('should return the right data from getInfo', () => {
    const { service } = makeSut();
    service.getInfo('artist').subscribe((res) => {
      expect(res).toEqual(MOCK_LAST_FM_ARTIST_RESPONSE);
    });
  });
});
