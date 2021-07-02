import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BulkScrobbleRoutingModule } from './bulk-scrobble-routing.module';
import { BulkScrobblePageComponent } from './pages/bulk-scrobble-page/bulk-scrobble-page.component';


@NgModule({
  declarations: [
    BulkScrobblePageComponent
  ],
  imports: [
    CommonModule,
    BulkScrobbleRoutingModule
  ]
})
export class BulkScrobbleModule { }
