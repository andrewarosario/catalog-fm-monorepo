import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { canActivateComposite } from 'catalog-fm-utils';
import { Observable } from 'rxjs';
import { LastFmAuthGuard } from '../last-fm-auth/last-fm-auth.guard';
import { LastFmCallbackTokenGuard } from '../last-fm-callback-token/last-fm-callback-token.guard';

@Injectable({
  providedIn: 'root',
})
export class LastFmAuthCallbackCompositeGuard implements CanActivate {
  constructor(
    private lastFmCallbackTokenGuard: LastFmCallbackTokenGuard,
    private lastFmAuthGuard: LastFmAuthGuard
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return canActivateComposite(
      this.lastFmCallbackTokenGuard.canActivate(route),
      this.lastFmAuthGuard.canActivate(route)
    );
  }
}
