import { spyPropertyGetter } from 'projects/catalog-fm-app/src/test/helpers/jasmine.spec-helpers';
import { BehaviorSubject, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { makeAuthUserStore } from '../../store/auth-user.store.mock';
import { OnlineLoggedUserLastFmService } from './online-logged-user-last-fm.service';

const makeSut = () => {
  const authUserStoreSpy = makeAuthUserStore();
  const isOfflineMock = new BehaviorSubject(false);
  const service = new OnlineLoggedUserLastFmService(authUserStoreSpy, isOfflineMock);
  return { service, authUserStoreSpy, isOfflineMock };
};

const expectServiceAssert = (service: OnlineLoggedUserLastFmService, assert: boolean): void => {
  service
    .isOnlineAndLogged()
    .pipe(take(1))
    .subscribe((isOnlineAndLogged) => {
      expect(isOnlineAndLogged).toBe(assert);
    });
};

describe('OnlineLoggedUserLastFmService', () => {
  it('should be created', () => {
    const { service } = makeSut();
    expect(service).toBeTruthy();
  });

  it('should return false when not logged and offline', () => {
    const { service, authUserStoreSpy, isOfflineMock } = makeSut();
    isOfflineMock.next(true);
    spyPropertyGetter(authUserStoreSpy, 'authUser$').and.returnValue(of(null));
    expectServiceAssert(service, false);
  });

  it('should return false when not logged and online', () => {
    const { service, authUserStoreSpy } = makeSut();
    spyPropertyGetter(authUserStoreSpy, 'authUser$').and.returnValue(of(null));
    expectServiceAssert(service, false);
  });

  it('should return false when logged and offline', () => {
    const { service, isOfflineMock } = makeSut();
    isOfflineMock.next(true);
    expectServiceAssert(service, false);
  });

  it('should return true when logged and online', () => {
    const { service } = makeSut();
    expectServiceAssert(service, true);
  });
});
