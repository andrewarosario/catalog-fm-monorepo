import { mockAuthUser } from '@/core/auth/mocks/auth-user.store.mock';
import { AuthUserLastFmService } from '@/core/auth/services/auth-user-last-fm/auth-user-last-fm.service';
import { of } from 'rxjs';
import { LastFmAuthGuard } from './last-fm-auth.guard';

const mockActivatedRouteWithToken = (): any => ({
  queryParams: {
    token: 'any_token',
  },
});

const makeAuthUserLastFmService = (): jasmine.SpyObj<AuthUserLastFmService> => {
  const spy = jasmine.createSpyObj<AuthUserLastFmService>('AuthUserLastFmService', [
    'authenticate',
  ]);
  spy.authenticate.and.returnValue(of(mockAuthUser()));
  return spy;
};

const makeSut = () => {
  const authUserLastFmServiceSpy = makeAuthUserLastFmService();
  const guard = new LastFmAuthGuard(authUserLastFmServiceSpy);
  return { guard, authUserLastFmServiceSpy };
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
