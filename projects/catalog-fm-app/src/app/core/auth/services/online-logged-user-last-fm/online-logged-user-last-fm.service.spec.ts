import { BehaviorSubject } from 'rxjs';
import { makeAuthUserStore } from '../../store/auth-user.store.mock';
import { OnlineLoggedUserLastFmService } from './online-logged-user-last-fm.service';

const makeSut = () => {
  const authUserStoreSpy = makeAuthUserStore();
  const isOfflineMock = new BehaviorSubject(false);
  const service = new OnlineLoggedUserLastFmService(authUserStoreSpy, isOfflineMock);
  return { service, authUserStoreSpy, isOfflineMock };
};

describe('OnlineLoggedUserLastFmService', () => {
  it('should be created', () => {
    const { service } = makeSut();
    expect(service).toBeTruthy();
  });
});
