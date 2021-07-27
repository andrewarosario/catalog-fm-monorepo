import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BulkScrobbleRoutingModule } from './bulk-scrobble-routing.module';
import { BulkScrobblePageComponent } from './pages/bulk-scrobble-page/bulk-scrobble-page.component';
import { UiFormModule, UiIconModule, UiProgressModule } from 'catalog-fm-ui';
import { UiInputModule } from 'catalog-fm-ui';

@NgModule({
  declarations: [BulkScrobblePageComponent],
  imports: [
    CommonModule,
    UiFormModule,
    BulkScrobbleRoutingModule,
    UiInputModule,
    UiIconModule,
    UiProgressModule,
  ],
})
export class BulkScrobbleModule {}
