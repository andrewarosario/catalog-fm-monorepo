import { LastFmAuthService } from './last-fm-auth.service';
import { makeLastFmHttpSpy } from '@/api/services/last-fm-http/last-fm-http.service.mock';
import { LastFmMethod } from '@/api/enums/last-fm-method';
import { LastFmAuthResponse } from '@/auth/models/last-fm-auth-response';

const MOCK_LAST_FM_AUTH_RESPONSE: LastFmAuthResponse = { session: { name: 'name', key: 'key' } };

const makeSut = () => {
  const lastFmHttp = makeLastFmHttpSpy(MOCK_LAST_FM_AUTH_RESPONSE);
  const service = new LastFmAuthService(lastFmHttp);
  return { service, lastFmHttp };
};

describe('LastFmAuthService', () => {
  it('should be created', () => {
    const { service } = makeSut();
    expect(service).toBeTruthy();
  });

  it('should call LastFmHttp.get with correct values', () => {
    const { service, lastFmHttp } = makeSut();
    const token = 'any_token';
    service.authenticate(token).subscribe();
    expect(lastFmHttp.get).toHaveBeenCalledWith({
      method: LastFmMethod.AuthGetSession,
      data: { token },
    });
  });

  it('should return the right data from authenticate', () => {
    const { service } = makeSut();
    service.authenticate('any_token').subscribe((res) => {
      expect(res).toEqual(MOCK_LAST_FM_AUTH_RESPONSE);
    });
  });
});
