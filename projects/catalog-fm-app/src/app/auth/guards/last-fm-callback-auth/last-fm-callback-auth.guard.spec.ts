import { Router } from '@angular/router';
import { LastFmCallbackAuthGuard } from './last-fm-callback-auth.guard';

const mockActivatedRouteWithToken = (): any => {
  return {
    queryParams: {
      token: 'any_token',
    },
  };
};

const mockActivatedRouteWithoutToken = (): any => {
  return {
    queryParams: {},
  };
};

const makeRouterSpy = (): jasmine.SpyObj<Router> => {
  return jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);
};

const makeSut = () => {
  const routerSpy = makeRouterSpy();
  const guard = new LastFmCallbackAuthGuard(routerSpy);
  return { guard, routerSpy };
};

describe('LastFmCallbackAuthGuard', () => {
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
});
