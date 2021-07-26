import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManualScrobbleRoutingModule } from './manual-scrobble-routing.module';
import { ManualScrobblePageComponent } from './pages/manual-scrobble-page/manual-scrobble-page.component';
import { IconsModule, UiFormModule } from 'catalog-fm-ui';

@NgModule({
  declarations: [ManualScrobblePageComponent],
  imports: [CommonModule, UiFormModule, ManualScrobbleRoutingModule, IconsModule],
})
export class ManualScrobbleModule {}
