import { TestBed } from '@angular/core/testing';
import { MOCK_WINDOW, WINDOW } from 'catalog-fm-utils';
import { spyPropertyGetter } from 'projects/catalog-fm-app/src/test/helpers/jasmine.spec-helpers';
import { AuthUserStore } from '../../store/auth-user.store';
import { makeAuthUserStore } from '../../store/auth-user.store.mock';
import { OnlineLoggedUserLastFmSyncService } from './online-logged-user-last-fm-sync.service';

const makeSut = () => {
  const authUserStoreSpy = makeAuthUserStore();
  const windowMock = MOCK_WINDOW;
  TestBed.configureTestingModule({
    providers: [
      { provide: AuthUserStore, useValue: authUserStoreSpy },
      { provide: WINDOW, useValue: windowMock },
    ],
  });
  const service = TestBed.inject(OnlineLoggedUserLastFmSyncService);
  return { service, authUserStoreSpy, windowMock };
};

describe('OnlineLoggedUserLastFmSyncService', () => {
  it('should be created', () => {
    const { service } = makeSut();
    expect(service).toBeTruthy();
  });

  it('should return false when not logged and offline', () => {
    const { service, authUserStoreSpy, windowMock } = makeSut();
    windowMock.navigator.onLine = false;
    spyPropertyGetter(authUserStoreSpy, 'authUser').and.returnValue(null);
    expect(service.isOnlineAndLogged()).toBe(false);
  });

  it('should return false when not logged and online', () => {
    const { service, authUserStoreSpy, windowMock } = makeSut();
    windowMock.navigator.onLine = true;
    spyPropertyGetter(authUserStoreSpy, 'authUser').and.returnValue(null);
    expect(service.isOnlineAndLogged()).toBe(false);
  });

  it('should return false when logged and offline', () => {
    const { service, windowMock } = makeSut();
    windowMock.navigator.onLine = false;
    expect(service.isOnlineAndLogged()).toBe(false);
  });

  it('should return true when logged and online', () => {
    const { service, windowMock } = makeSut();
    windowMock.navigator.onLine = true;
    expect(service.isOnlineAndLogged()).toBe(true);
  });
});
