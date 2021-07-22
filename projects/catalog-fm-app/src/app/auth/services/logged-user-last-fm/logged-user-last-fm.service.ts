import { Injectable } from '@angular/core';
import { StorageService } from 'catalog-fm-utils';
import { AuthLastFmSession, AuthUser } from '../../models/auth-user';
import { AuthUserStore } from '../../store/auth-user.store';

@Injectable({
  providedIn: 'root',
})
export class LoggedUserLastFmService {
  constructor(private store: AuthUserStore, private storageService: StorageService) {}

  async getLoggedUser(): Promise<AuthLastFmSession> {
    const authUser = (await this.storageService.getItem('authUser')) as AuthUser;
    const lastFmSession = authUser?.lastFmSession;
    if (lastFmSession) {
      this.store.setLastFmSession(lastFmSession);
    }
    return lastFmSession;
  }
}
