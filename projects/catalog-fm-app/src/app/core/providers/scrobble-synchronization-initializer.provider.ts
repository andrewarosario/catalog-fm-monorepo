import { ScrobbleSynchronizationService } from '@/last-fm/scrobble/services/scrobble-synchronization/scrobble-synchronization.service';
import { APP_INITIALIZER, Provider } from '@angular/core';

function ScrobbleSynchronizationFactory(
  scrobbleSynchronizationService: ScrobbleSynchronizationService
) {
  return () => {
    scrobbleSynchronizationService.synchronizeScrobbles();
  };
}

export const SCROBBLE_SYNCHRONIZATION_INITIALIZER: Provider = {
  provide: APP_INITIALIZER,
  useFactory: ScrobbleSynchronizationFactory,
  deps: [ScrobbleSynchronizationService],
  multi: true,
};
