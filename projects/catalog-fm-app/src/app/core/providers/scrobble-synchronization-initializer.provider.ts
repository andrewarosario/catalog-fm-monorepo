import { ScrobbleSynchronizationService } from "@/last-fm/scrobble/services/scrobble-synchronization/scrobble-synchronization.service";
import { APP_INITIALIZER, Provider } from "@angular/core";

function ScrobbleSynchronizationFactory(scrobbleSynchronizationService: ScrobbleSynchronizationService) {
  return () => {
    scrobbleSynchronizationService.synchronizeScrobbles().subscribe((tracks) => {
      alert(`${tracks} tracks scrobbled`);
    });
  }
};

export const SCROBBLE_SYNCHRONIZATION_INITIALIZER: Provider = {
  provide: APP_INITIALIZER,
  useFactory: ScrobbleSynchronizationFactory,
  deps: [ScrobbleSynchronizationService],
  multi: true,
}