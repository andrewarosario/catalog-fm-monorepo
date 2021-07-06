import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthLastFmSession, AuthUser } from '../models/auth-user';

@Injectable({
  providedIn: 'root',
})
export class AuthUserStore {
  private authUserSubject$ = new BehaviorSubject<AuthUser>(null);
  authUser$ = this.authUserSubject$.asObservable();

  setLastFmSession(lastFmSession: AuthLastFmSession): Observable<AuthUser> {
    this.authUserSubject$.next({ lastFmSession });
    return this.authUser$;
  }

  get authUser(): AuthUser {
    return this.authUserSubject$.getValue();
  }
}
