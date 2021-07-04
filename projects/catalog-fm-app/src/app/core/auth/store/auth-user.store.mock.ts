import { of } from 'rxjs';
import { mockAuthUser } from '../mocks/auth-user.mock';
import { AuthUserStore } from './auth-user.store';

export const makeAuthUserStore = (): jasmine.SpyObj<AuthUserStore> => {
  return jasmine.createSpyObj<AuthUserStore>('AuthUserStore', {
    setLastFmSession: of(mockAuthUser()),
  });
};
