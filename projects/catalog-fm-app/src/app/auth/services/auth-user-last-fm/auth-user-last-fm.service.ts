import { Injectable } from '@angular/core';
import { StorageService } from 'catalog-fm-utils';
import { LastFmAuthResponse, LastFmAuthService } from 'last-fm';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthUser } from '../../models/auth-user';
import { AuthUserStore } from '../../store/auth-user.store';

@Injectable({
  providedIn: 'root',
})
export class AuthUserLastFmService {
  constructor(
    private lastFmAuthService: LastFmAuthService,
    private store: AuthUserStore,
    private storageService: StorageService
  ) {}

  authenticate(token: string): Observable<AuthUser> {
    return this.lastFmAuthService.authenticate(token).pipe(
      switchMap((response: LastFmAuthResponse) => this.store.setLastFmSession(response.session)),
      map((authUser: AuthUser) => this.setAuthUserToStorage(authUser))
    );
  }

  private setAuthUserToStorage(authUser: AuthUser): AuthUser {
    this.storageService.setItem('authUser', authUser);
    return authUser;
  }
}
