import { ScrobbleSynchronizationService } from '@/last-fm/scrobble/services/scrobble-online-sync/scrobble-synchronization.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  constructor(private scrobbleSynchronizationService: ScrobbleSynchronizationService) {}

  load(): void {
    this.scrobbleSynchronizationService.synchronizeScrobbles().subscribe((tracks) => {
      alert(`${tracks} tracks scrobbled`);
    });
  }
}
