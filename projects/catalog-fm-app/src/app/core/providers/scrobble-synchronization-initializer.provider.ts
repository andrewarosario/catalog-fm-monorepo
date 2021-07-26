import { ScrobbleSynchronizationService } from '@/last-fm/scrobble/services/scrobble-synchronization/scrobble-synchronization.service';
import { APP_INITIALIZER, Provider } from '@angular/core';
import { UiMessageService } from 'catalog-fm-ui';

function ScrobbleSynchronizationFactory(
  scrobbleSynchronizationService: ScrobbleSynchronizationService,
  messageService: UiMessageService
) {
  return () => {
    scrobbleSynchronizationService.synchronizeScrobbles().subscribe((tracks) => {
      messageService.success(`${tracks} tracks scrobbled from cache!`);
    });
  };
}

export const SCROBBLE_SYNCHRONIZATION_INITIALIZER: Provider = {
  provide: APP_INITIALIZER,
  useFactory: ScrobbleSynchronizationFactory,
  deps: [ScrobbleSynchronizationService, UiMessageService],
  multi: true,
};
