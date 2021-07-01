import { getAuthToken } from '@/auth/utils/get-auth-token';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LastFmCallbackTokenGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = getAuthToken(route);
    if (!token) {
      this.router.navigateByUrl('/auth');
      return false;
    }
    return true;
  }
}
