import { LastFmAuthGuard } from '../last-fm-auth/last-fm-auth.guard';
import { LastFmCallbackTokenGuard } from '../last-fm-callback-token/last-fm-callback-token.guard';
import { LastFmAuthCallbackCompositeGuard } from './last-fm-auth-callback-composite.guard';

const mockActivatedRouteWithToken = (): any => ({
  queryParams: {
    token: 'any_token',
  },
});

const makeLastFmCallbackTokenGuard = (): jasmine.SpyObj<LastFmCallbackTokenGuard> => {
  return jasmine.createSpyObj<LastFmCallbackTokenGuard>('LastFmCallbackTokenGuard', [
    'canActivate',
  ]);
};

const makeLastFmAuthGuard = (): jasmine.SpyObj<LastFmAuthGuard> => {
  return jasmine.createSpyObj<LastFmAuthGuard>('LastFmAuthGuard', ['canActivate']);
};

const makeSut = () => {
  const lastFmCallbackTokenGuardSpy = makeLastFmCallbackTokenGuard();
  const lastFmAuthGuardSpy = makeLastFmAuthGuard();
  const guard = new LastFmAuthCallbackCompositeGuard(
    lastFmCallbackTokenGuardSpy,
    lastFmAuthGuardSpy
  );
  return { guard, lastFmCallbackTokenGuardSpy, lastFmAuthGuardSpy };
};

describe('LastFmAuthCallbackCompositeGuard', () => {
  it('should be created', () => {
    const { guard } = makeSut();
    expect(guard).toBeTruthy();
  });

  it('should call LastFmCallbackTokenGuard.canActivate with correct values', () => {
    const { guard, lastFmCallbackTokenGuardSpy } = makeSut();
    guard.canActivate(mockActivatedRouteWithToken());
    expect(lastFmCallbackTokenGuardSpy.canActivate).toHaveBeenCalledWith(
      mockActivatedRouteWithToken()
    );
  });

  it('should call LastFmAuthGuard.canActivate with correct values', () => {
    const { guard, lastFmAuthGuardSpy } = makeSut();
    guard.canActivate(mockActivatedRouteWithToken());
    expect(lastFmAuthGuardSpy.canActivate).toHaveBeenCalledWith(mockActivatedRouteWithToken());
  });
});
