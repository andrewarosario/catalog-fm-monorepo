import { NgModule } from '@angular/core';
import { SCROBBLE_SYNCHRONIZATION_INITIALIZER } from './providers/scrobble-synchronization-initializer.provider';

@NgModule({
  providers: [
    SCROBBLE_SYNCHRONIZATION_INITIALIZER
  ],
})
export class CoreModule {}
