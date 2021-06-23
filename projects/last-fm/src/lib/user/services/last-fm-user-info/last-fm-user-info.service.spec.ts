import { LastFmMethod } from '@/api/enums/last-fm-method';
import { makeLastFmHttpSpy } from '@/api/services/last-fm-http/last-fm-http.service.mock';
import { MOCK_LAST_FM_USER_RESPONSE } from '@/user/mocks/last-fm-user-response.mock';
import { LastFmUserInfoService } from './last-fm-user-info.service';

const makeSut = () => {
  const lastFmHttp = makeLastFmHttpSpy(MOCK_LAST_FM_USER_RESPONSE);
  const service = new LastFmUserInfoService(lastFmHttp);
  return { service, lastFmHttp };
};

describe('LastFmUserInfoService', () => {
  it('should be created', () => {
    const { service } = makeSut();
    expect(service).toBeTruthy();
  });

  it('should call LastFmHttp.get with correct values', () => {
    const { service, lastFmHttp } = makeSut();
    service.getInfo('user').subscribe();
    expect(lastFmHttp.get).toHaveBeenCalledOnceWith({
      method: LastFmMethod.UserGetInfo,
      data: { user: 'user' },
    });
  });

  it('should return the right data from getInfo', () => {
    const { service } = makeSut();
    service.getInfo('user').subscribe((res) => {
      expect(res).toEqual(MOCK_LAST_FM_USER_RESPONSE);
    });
  });
});
