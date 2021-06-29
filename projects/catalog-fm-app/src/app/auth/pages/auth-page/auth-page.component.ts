import { Component } from '@angular/core';
import { LastFmAuthRedirectService } from 'last-fm';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.less'],
})
export class AuthPageComponent {
  constructor(private lastFmAuthRedirectService: LastFmAuthRedirectService) {}

  lastFmRedirect() {
    this.lastFmAuthRedirectService.redirect('auth/callback');
  }
}
