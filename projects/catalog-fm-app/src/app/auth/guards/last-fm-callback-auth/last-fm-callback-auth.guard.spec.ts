import { Router } from '@angular/router';
import { LastFmCallbackAuthGuard } from './last-fm-callback-auth.guard';

const mockActivatedRouteWithToken = (): any => {
  return {
    route: {
      queryParams: {
        token: 'any_token',
      },
    },
  };
};

const mockActivatedRouteWithoutToken = (): any => {
  return {
    route: {
      queryParams: {},
    },
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
});
