import { LastFmAuthService, MOCK_LAST_FM_AUTH_RESPONSE } from 'last-fm';
import { makeStorageServiceSpy } from 'projects/catalog-fm-app/src/test/last-fm/services/storage.service.mock';
import { of } from 'rxjs';
import { mockAuthUser } from '../../mocks/auth-user.mock';
import { makeAuthUserStore } from '../../store/auth-user.store.mock';

import { AuthUserLastFmService } from './auth-user-last-fm.service';

const makeLastFmAuthService = (): jasmine.SpyObj<LastFmAuthService> => {
  const spy = jasmine.createSpyObj<LastFmAuthService>('LastFmAuthService', ['authenticate']);
  spy.authenticate.and.returnValue(of(MOCK_LAST_FM_AUTH_RESPONSE));
  return spy;
};

const makeSut = () => {
  const lastFmAuthServiceSpy = makeLastFmAuthService();
  const authStoreSpy = makeAuthUserStore();
  const storageServiceSpy = makeStorageServiceSpy();
  const service = new AuthUserLastFmService(lastFmAuthServiceSpy, authStoreSpy, storageServiceSpy);
  return { service, lastFmAuthServiceSpy, authStoreSpy, storageServiceSpy };
};

describe('AuthUserLastFmService', () => {
  it('should be created', () => {
    const { service } = makeSut();
    expect(service).toBeTruthy();
  });

  it('should call lastFmAuthService.authenticate with correct value', () => {
    const { service, lastFmAuthServiceSpy } = makeSut();
    service.authenticate('any_token');
    expect(lastFmAuthServiceSpy.authenticate).toHaveBeenCalledWith('any_token');
  });

  it('should call store.setLastFmSession with correct value', () => {
    const { service, authStoreSpy } = makeSut();
    service.authenticate('any_token').subscribe(() => {
      expect(authStoreSpy.setLastFmSession).toHaveBeenCalledWith(
        MOCK_LAST_FM_AUTH_RESPONSE.session
      );
    });
  });

  it('should call storageService.setItem with correct values', () => {
    const { service, storageServiceSpy } = makeSut();
    service.authenticate('any_token').subscribe(() => {
      expect(storageServiceSpy.setItem).toHaveBeenCalledWith('authUser', mockAuthUser());
    });
  });

  it('should return the correct value from authorize', () => {
    const { service } = makeSut();
    service.authenticate('any_token').subscribe((authUser) => {
      expect(authUser).toEqual(mockAuthUser());
    });
  });
});
