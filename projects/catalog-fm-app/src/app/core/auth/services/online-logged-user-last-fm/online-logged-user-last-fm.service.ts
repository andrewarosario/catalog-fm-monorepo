import { Inject, Injectable } from '@angular/core';
import { IS_OFFLINE } from 'catalog-fm-utils';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthUserStore } from '../../store/auth-user.store';

@Injectable({
  providedIn: 'root',
})
export class OnlineLoggedUserLastFmService {
  constructor(
    private store: AuthUserStore,
    @Inject(IS_OFFLINE) private isOffline$: Observable<boolean>
  ) {}

  isOnlineAndLogged(): Observable<boolean> {
    return combineLatest([this.store.authUser$, this.isOffline$]).pipe(
      map(([user, isOffline]) => user.lastFmSession && !isOffline)
    );
  }
}
