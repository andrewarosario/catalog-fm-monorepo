import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManualScrobbleRoutingModule } from './manual-scrobble-routing.module';
import { ManualScrobblePageComponent } from './pages/manual-scrobble-page/manual-scrobble-page.component';


@NgModule({
  declarations: [
    ManualScrobblePageComponent
  ],
  imports: [
    CommonModule,
    ManualScrobbleRoutingModule
  ]
})
export class ManualScrobbleModule { }
