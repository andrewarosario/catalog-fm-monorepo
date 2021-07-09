import { getAuthToken } from '@/auth/utils/get-auth-token';
import { AuthUserLastFmService } from '@/core/auth/services/auth-user-last-fm/auth-user-last-fm.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LastFmAuthGuard implements CanActivate {
  constructor(private authUserLastFmService: AuthUserLastFmService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const token = getAuthToken(route);
    return this.authUserLastFmService.authenticate(token).pipe(
      map((authUser) => !!authUser),
      tap((isAuthenticated) => this.router.navigateByUrl(isAuthenticated ? '/last-fm' : '/auth'))
    );
  }
}
