import { LastFmAuthService, MOCK_LAST_FM_AUTH_RESPONSE } from 'last-fm';
import { makeStorageServiceSpy } from 'projects/catalog-fm-app/src/test/last-fm/services/storage.service.mock';
import { of } from 'rxjs';
import { AuthUser } from '../../models/auth-user';
import { AuthUserStore } from '../../store/auth-user.store';

import { AuthUserLastFmService } from './auth-user-last-fm.service';

const mockAuthUser = (): AuthUser => ({ lastFmSession: MOCK_LAST_FM_AUTH_RESPONSE.session });

const makeLastFmAuthService = (): jasmine.SpyObj<LastFmAuthService> => {
  const spy = jasmine.createSpyObj<LastFmAuthService>('LastFmAuthService', ['authenticate']);
  spy.authenticate.and.returnValue(of(MOCK_LAST_FM_AUTH_RESPONSE));
  return spy;
};

const makeAuthUserStore = (): jasmine.SpyObj<AuthUserStore> => {
  const spy = jasmine.createSpyObj<AuthUserStore>('AuthUserStore', ['setLastFmSession']);
  spy.setLastFmSession.and.returnValue(of(mockAuthUser()));
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
});
