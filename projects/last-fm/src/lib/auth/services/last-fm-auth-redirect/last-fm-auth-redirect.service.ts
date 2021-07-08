import { LastFmKey } from '@/api/models/last-fm-key';
import { LAST_FM_KEY } from '@/api/tokens/last-fm-key.token';
import { Inject, Injectable } from '@angular/core';
import { WINDOW } from 'catalog-fm-utils';

@Injectable({
  providedIn: 'root',
})
export class LastFmAuthRedirectService {
  constructor(
    @Inject(WINDOW) private window: Window,
    @Inject(LAST_FM_KEY) private lastFmKey: LastFmKey
  ) {}

  redirect(urlRedirect: string = ''): void {
    const authUrl = 'http://www.last.fm/api/auth/';
    const callbackUrl = `${encodeURIComponent(`${this.window.location.origin}/${urlRedirect}`)}`;

    this.window.location.href = `${authUrl}?api_key=${this.lastFmKey.apiPublicKey}&cb=${callbackUrl}`;
  }
}
