import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LastFmCallbackTokenGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.getToken(route);
    if (!token) {
      this.router.navigateByUrl('/auth');
      return false;
    }
    return true;
  }

  private getToken(route: ActivatedRouteSnapshot): string {
    return route.queryParams.token;
  }
}
