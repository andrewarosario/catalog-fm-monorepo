import { NgModule } from '@angular/core';
import { LOGGED_USER_LAST_FM_INITIALIZER } from './providers/logged-user-last-fm-initializer.provider';
import { SCROBBLE_SYNCHRONIZATION_INITIALIZER } from './providers/scrobble-synchronization-initializer.provider';

@NgModule({
  providers: [
    LOGGED_USER_LAST_FM_INITIALIZER,
    SCROBBLE_SYNCHRONIZATION_INITIALIZER
  ],
})
export class CoreModule {}
