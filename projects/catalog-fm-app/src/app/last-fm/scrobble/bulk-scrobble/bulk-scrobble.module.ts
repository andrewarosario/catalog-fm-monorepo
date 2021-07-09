import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BulkScrobbleRoutingModule } from './bulk-scrobble-routing.module';
import { BulkScrobblePageComponent } from './pages/bulk-scrobble-page/bulk-scrobble-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BulkScrobblePageComponent],
  imports: [CommonModule, ReactiveFormsModule, BulkScrobbleRoutingModule],
})
export class BulkScrobbleModule {}
