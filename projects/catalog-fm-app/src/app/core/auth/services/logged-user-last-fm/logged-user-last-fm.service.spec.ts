import { makeStorageServiceSpy } from 'projects/catalog-fm-app/src/test/last-fm/services/storage.service.mock';
import { mockAuthUser } from '../../mocks/auth-user.mock';
import { makeAuthUserStore } from '../../store/auth-user.store.mock';
import { LoggedUserLastFmService } from './logged-user-last-fm.service';

const makeSut = () => {
  const authStoreSpy = makeAuthUserStore();
  const storageServiceSpy = makeStorageServiceSpy();
  storageServiceSpy.getItem.and.returnValue(Promise.resolve(mockAuthUser()));
  const service = new LoggedUserLastFmService(authStoreSpy, storageServiceSpy);
  return { service, authStoreSpy, storageServiceSpy };
};

describe('LoggedUserLastFmService', () => {
  it('should be created', () => {
    const { service } = makeSut();
    expect(service).toBeTruthy();
  });

  it('should call storageService.getItem with correct value', () => {
    const { service, storageServiceSpy } = makeSut();
    service.getLoggedUser();
    expect(storageServiceSpy.getItem).toHaveBeenCalledWith('authUser');
  });

  it('should return falsy if storageService.getItem return a falsy value', async () => {
    const { service, storageServiceSpy } = makeSut();
    storageServiceSpy.getItem.and.returnValue(Promise.resolve(null));
    const user = await service.getLoggedUser();
    expect(user).toBeFalsy();
  });

  it('should return falsy if storageService.getItem return an user without lastFmSession', async () => {
    const { service, storageServiceSpy } = makeSut();
    storageServiceSpy.getItem.and.returnValue(Promise.resolve({ anySession: 'session' }));
    const user = await service.getLoggedUser();
    expect(user).toBeFalsy();
  });

  it('should return lastFmSession if storageService.getItem return an user with lastFmSession', async () => {
    const { service } = makeSut();
    const user = await service.getLoggedUser();
    expect(user).toEqual(mockAuthUser().lastFmSession);
  });

  it('should call store.setLastFmSession if storageService.getItem return an user with lastFmSession', async () => {
    const { service, authStoreSpy } = makeSut();
    await service.getLoggedUser();
    expect(authStoreSpy.setLastFmSession).toHaveBeenCalledWith(mockAuthUser().lastFmSession);
  });
});
