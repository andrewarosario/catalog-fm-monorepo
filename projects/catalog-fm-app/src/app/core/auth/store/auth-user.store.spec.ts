import { MOCK_LAST_FM_AUTH_RESPONSE } from 'last-fm';
import { take } from 'rxjs/operators';
import { AuthUserStore } from './auth-user.store';

describe('AuthUserStore', () => {
  it('should create', () => {
    const store = new AuthUserStore();
    expect(store).toBeTruthy();
  });

  it('should set last.fm session with correct values', () => {
    const store = new AuthUserStore();
    store.setLastFmSession(MOCK_LAST_FM_AUTH_RESPONSE.session);
    store.authUser$.pipe(take(1)).subscribe((authUser) => {
      expect(authUser).toEqual({ lastFmSession: MOCK_LAST_FM_AUTH_RESPONSE.session });
    });
  });

  it('should return last.fm session with correct values', () => {
    const store = new AuthUserStore();
    const authUser$ = store.setLastFmSession(MOCK_LAST_FM_AUTH_RESPONSE.session);
    authUser$.pipe(take(1)).subscribe((authUser) => {
      expect(authUser).toEqual({ lastFmSession: MOCK_LAST_FM_AUTH_RESPONSE.session });
    });
  });
});
