import { WINDOW } from '@/tokens/window/window.token';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConnectionStatusService {
  private isOnlineSubject$ = new BehaviorSubject<boolean>(this.isOnline);
  readonly isOnline$ = this.isOnlineSubject$.asObservable();

  constructor(@Inject(WINDOW) private window: Window) {
    this.addConnectionStatusListeners();
  }

  get isOnline(): boolean {
    return this.window.navigator.onLine;
  }

  private addConnectionStatusListeners(): void {
    this.window.addEventListener('online', () => this.setStatusConnection());
    this.window.addEventListener('offline', () => this.setStatusConnection());
  }

  private setStatusConnection(): void {
    this.isOnlineSubject$.next(this.isOnline);
  }
}
