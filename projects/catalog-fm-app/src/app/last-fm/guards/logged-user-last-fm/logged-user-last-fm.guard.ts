import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { LoggedUserLastFmService } from '../../../auth/services/logged-user-last-fm/logged-user-last-fm.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedUserLastFmGuard implements CanActivate {
  constructor(private loggedUserLastFmService: LoggedUserLastFmService, private router: Router) {}
  async canActivate(): Promise<boolean> {
    const lastFmSession = await this.loggedUserLastFmService.getLoggedUser();
    if (!lastFmSession) {
      this.router.navigateByUrl('/auth');
      return false;
    }
    return true;
  }
}
