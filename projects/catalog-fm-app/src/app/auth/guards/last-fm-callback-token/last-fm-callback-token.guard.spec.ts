import { Router } from '@angular/router';
import { LastFmCallbackTokenGuard } from './last-fm-callback-token.guard';

const mockActivatedRouteWithToken = (): any => ({
  queryParams: {
    token: 'any_token',
  },
});

const mockActivatedRouteWithoutToken = (): any => ({
  queryParams: {},
});

const makeRouterSpy = (): jasmine.SpyObj<Router> => {
  return jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);
};

const makeSut = () => {
  const routerSpy = makeRouterSpy();
  const guard = new LastFmCallbackTokenGuard(routerSpy);
  return { guard, routerSpy };
};

describe('LastFmCallbackTokenGuard', () => {
  it('should be created', () => {
    const { guard } = makeSut();
    expect(guard).toBeTruthy();
  });

  it('should return true when there is token on queryParams', () => {
    const { guard } = makeSut();
    const active = guard.canActivate(mockActivatedRouteWithToken());
    expect(active).toBe(true);
  });

  it('should return false when there is no token on queryParams', () => {
    const { guard } = makeSut();
    const active = guard.canActivate(mockActivatedRouteWithoutToken());
    expect(active).toBe(false);
  });

  it('should navigate to /auth when there is no token on queryParams', () => {
    const { guard, routerSpy } = makeSut();
    guard.canActivate(mockActivatedRouteWithoutToken());
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/auth');
  });
});
