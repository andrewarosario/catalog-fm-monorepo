import { getAuthToken } from '@/auth/utils/get-auth-token';
import { AuthUserLastFmService } from '@/core/auth/services/auth-user-last-fm/auth-user-last-fm.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LastFmAuthGuard implements CanActivate {
  constructor(private authUserLastFmService: AuthUserLastFmService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const token = getAuthToken(route);
    return this.authUserLastFmService.authenticate(token).pipe(
      map((authUser) => {
        return !!authUser;
      })
    );
  }
}
