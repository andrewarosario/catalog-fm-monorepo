import { of } from 'rxjs';
import { mockAuthUser } from '../mocks/auth-user.mock';
import { AuthUserStore } from './auth-user.store';

export const makeAuthUserStore = (): jasmine.SpyObj<AuthUserStore> => {
  const spy = jasmine.createSpyObj<AuthUserStore>('AuthUserStore', ['setLastFmSession']);
  spy.setLastFmSession.and.returnValue(of(mockAuthUser()));
  return spy;
};
