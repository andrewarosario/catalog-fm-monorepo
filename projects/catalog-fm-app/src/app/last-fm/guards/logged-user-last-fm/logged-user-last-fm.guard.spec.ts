import { Router } from '@angular/router';
import { mockAuthUser } from '../../../core/auth/mocks/auth-user.mock';
import { LoggedUserLastFmService } from '../../../core/auth/services/logged-user-last-fm/logged-user-last-fm.service';

import { LoggedUserLastFmGuard } from './logged-user-last-fm.guard';

const makeRouterSpy = (): jasmine.SpyObj<Router> => {
  return jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);
};

const makeLoggedUserLastFmService = (): jasmine.SpyObj<LoggedUserLastFmService> => {
  return jasmine.createSpyObj<LoggedUserLastFmService>('LoggedUserLastFmService', {
    getLoggedUser: Promise.resolve(mockAuthUser().lastFmSession),
  });
};

const makeSut = () => {
  const loggedUserLastFmServiceSpy = makeLoggedUserLastFmService();
  const routerSpy = makeRouterSpy();
  const guard = new LoggedUserLastFmGuard(loggedUserLastFmServiceSpy, routerSpy);
  return { guard, loggedUserLastFmServiceSpy, routerSpy };
};

describe('LoggedUserLastFmGuard', () => {
  it('should be created', () => {
    const { guard } = makeSut();
    expect(guard).toBeTruthy();
  });

  it('should call loggedUserLastFmService.getLoggedUser', () => {
    const { guard, loggedUserLastFmServiceSpy } = makeSut();
    guard.canActivate();
    expect(loggedUserLastFmServiceSpy.getLoggedUser).toHaveBeenCalled();
  });

  it('should navigate to /auth when there is no lastFmSession', async () => {
    const { guard, loggedUserLastFmServiceSpy, routerSpy } = makeSut();
    loggedUserLastFmServiceSpy.getLoggedUser.and.returnValue(Promise.resolve(null));
    await guard.canActivate();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/auth');
  });

  it('should return false when there is no lastFmSession', async () => {
    const { guard, loggedUserLastFmServiceSpy } = makeSut();
    loggedUserLastFmServiceSpy.getLoggedUser.and.returnValue(Promise.resolve(null));
    const value = await guard.canActivate();
    expect(value).toBe(false);
  });

  it('should return true when there is lastFmSession', async () => {
    const { guard } = makeSut();
    const value = await guard.canActivate();
    expect(value).toBe(true);
  });
});
