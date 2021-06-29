import { InjectionToken } from '@angular/core';
import { defer, fromEvent, merge, Observable, of } from 'rxjs';
import { switchMapTo } from 'rxjs/operators';

const initialEvent$ = of(null);
const onlineEvent$ = fromEvent(window, 'online');
const offlineEvent$ = fromEvent(window, 'offline');
const isOfflineDefer$ = defer(() => of(!window.navigator.onLine));

const isOffline$ = merge(initialEvent$, onlineEvent$, offlineEvent$).pipe(
  switchMapTo(isOfflineDefer$)
);

export const IS_OFFLINE = new InjectionToken<Observable<boolean>>(
  'Returns an observable with the connection status',
  {
    factory: () => isOffline$,
  }
);
