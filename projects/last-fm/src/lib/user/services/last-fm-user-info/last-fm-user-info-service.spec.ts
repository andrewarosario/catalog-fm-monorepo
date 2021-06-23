import { LastFmMethod } from '@/api/enums/last-fm-method';
import { makeLastFmHttpSpy } from '@/api/services/last-fm-http/last-fm-http.service.mock';
import { LastFmUserInfoService } from './last-fm-user-info.service';

const makeSut = () => {
  const lastFmHttp = makeLastFmHttpSpy({});
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
});
