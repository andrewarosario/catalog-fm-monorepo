import { Inject, Injectable } from '@angular/core';
import { WINDOW } from 'catalog-fm-utils';
import { AuthUserStore } from '../../store/auth-user.store';

@Injectable({
  providedIn: 'root',
})
export class OnlineLoggedUserLastFmSyncService {
  constructor(private store: AuthUserStore, @Inject(WINDOW) private window: Window) {}

  isOnlineAndLogged(): boolean {
    return Boolean(this.store.authUser?.lastFmSession && this.window.navigator.onLine);
  }
}
