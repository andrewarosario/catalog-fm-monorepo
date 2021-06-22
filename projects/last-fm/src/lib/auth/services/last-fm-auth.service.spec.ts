import { LastFmAuthService } from './last-fm-auth.service';
import { TestBed } from '@angular/core/testing';
import { LastFmHttp } from '@/api/services/last-fm-http/last-fm-http.service';
import { LastFmHttpMock } from '@/api/services/last-fm-http/last-fm-http.service.mock';
import { LastFmMethod } from '@/api/enums/last-fm-method';
import { LastFmAuthResponse } from '../models/last-fm-auth-response';

describe('LastFmAuthService', () => {
  const MOCK_LAST_FM_AUTH_RESPONSE: LastFmAuthResponse = { session: { name: 'name', key: 'key' } };
  let service: LastFmAuthService;
  let lastFmHttpMock: LastFmHttpMock<LastFmAuthResponse>;

  beforeEach(() => {
    lastFmHttpMock = new LastFmHttpMock(MOCK_LAST_FM_AUTH_RESPONSE);

    TestBed.configureTestingModule({
      providers: [{ provide: LastFmHttp, useValue: lastFmHttpMock.spyObject }],
    });
    service = TestBed.inject(LastFmAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call LastFmHttp.get with correct values', () => {
    const token = 'any_token';
    service.authenticate(token).subscribe();
    expect(lastFmHttpMock.spyObject.get).toHaveBeenCalledWith({
      method: LastFmMethod.AuthGetSession,
      data: { token },
    });
  });

  it('should return the right data from authenticate', () => {
    service.authenticate('any_token').subscribe((res) => {
      expect(res).toEqual(MOCK_LAST_FM_AUTH_RESPONSE);
    });
  });
});
