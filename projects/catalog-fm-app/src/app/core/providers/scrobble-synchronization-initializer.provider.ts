import { ScrobbleSynchronizationService } from '@/last-fm/scrobble/services/scrobble-synchronization/scrobble-synchronization.service';
import { APP_INITIALIZER, Provider } from '@angular/core';
import { MessageService } from 'catalog-fm-ui';

function ScrobbleSynchronizationFactory(
  scrobbleSynchronizationService: ScrobbleSynchronizationService,
  messageService: MessageService
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
  deps: [ScrobbleSynchronizationService, MessageService],
  multi: true,
};
