import { LastFmAuthService, MOCK_LAST_FM_AUTH_RESPONSE } from 'last-fm';
import { makeStorageServiceSpy } from 'projects/catalog-fm-app/src/test/last-fm/services/storage.service.mock';
import { of } from 'rxjs';
import { AuthUserStore } from '../../store/auth-user.store';

import { AuthUserLastFmService } from './auth-user-last-fm.service';

const makeLastFmAuthService = (): jasmine.SpyObj<LastFmAuthService> => {
  const spy = jasmine.createSpyObj<LastFmAuthService>('LastFmAuthService', ['authenticate']);
  spy.authenticate.and.returnValue(of(MOCK_LAST_FM_AUTH_RESPONSE));
  return spy;
};

const makeSut = () => {
  const lastFmAuthServiceSpy = makeLastFmAuthService();
  const store = new AuthUserStore();
  const storageServiceSpy = makeStorageServiceSpy();
  const service = new AuthUserLastFmService(lastFmAuthServiceSpy, store, storageServiceSpy);
  return { service, lastFmAuthServiceSpy, store, storageServiceSpy };
};

describe('AuthUserLastFmService', () => {
  it('should be created', () => {
    const { service } = makeSut();
    expect(service).toBeTruthy();
  });
});
