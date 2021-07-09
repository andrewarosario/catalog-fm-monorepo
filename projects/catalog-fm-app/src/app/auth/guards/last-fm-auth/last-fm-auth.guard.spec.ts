import { mockAuthUser } from '@/core/auth/mocks/auth-user.mock';
import { AuthUserLastFmService } from '@/core/auth/services/auth-user-last-fm/auth-user-last-fm.service';
import { makeRouterSpy } from 'projects/catalog-fm-app/src/test/mocks/router.mock';
import { of } from 'rxjs';
import { LastFmAuthGuard } from './last-fm-auth.guard';

const mockActivatedRouteWithToken = (): any => ({
  queryParams: {
    token: 'any_token',
  },
});

const makeAuthUserLastFmService = (): jasmine.SpyObj<AuthUserLastFmService> => {
  return jasmine.createSpyObj<AuthUserLastFmService>('AuthUserLastFmService', {
    authenticate: of(mockAuthUser()),
  });
};

const makeSut = () => {
  const authUserLastFmServiceSpy = makeAuthUserLastFmService();
  const routerSpy = makeRouterSpy();
  const guard = new LastFmAuthGuard(authUserLastFmServiceSpy, routerSpy);
  return { guard, authUserLastFmServiceSpy, routerSpy };
};

describe('LastFmAuthGuard', () => {
  it('should be created', () => {
    const { guard } = makeSut();
    expect(guard).toBeTruthy();
  });

  it('should call authUserLastFmService.authenticate with correct values', () => {
    const { guard, authUserLastFmServiceSpy } = makeSut();
    guard.canActivate(mockActivatedRouteWithToken());
    expect(authUserLastFmServiceSpy.authenticate).toHaveBeenCalledWith(
      mockActivatedRouteWithToken().queryParams.token
    );
  });

  it('should navigate to /last-fm when authenticated', () => {
    const { guard, routerSpy } = makeSut();
    guard.canActivate(mockActivatedRouteWithToken()).subscribe(() => {
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/last-fm');
    });
  });

  it('should navigate to /auth when not authenticated', () => {
    const { guard, routerSpy, authUserLastFmServiceSpy } = makeSut();
    authUserLastFmServiceSpy.authenticate.and.returnValue(of(null));
    guard.canActivate(mockActivatedRouteWithToken()).subscribe(() => {
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/auth');
    });
  });

  it('should return true when authenticate returns auth user', () => {
    const { guard } = makeSut();
    guard.canActivate(mockActivatedRouteWithToken()).subscribe((value) => {
      expect(value).toBe(true);
    });
  });

  it('should return false when authenticate returns a falsy value', () => {
    const { guard, authUserLastFmServiceSpy } = makeSut();
    authUserLastFmServiceSpy.authenticate.and.returnValue(of(null));
    guard.canActivate(mockActivatedRouteWithToken()).subscribe((value) => {
      expect(value).toBe(false);
    });
  });
});
