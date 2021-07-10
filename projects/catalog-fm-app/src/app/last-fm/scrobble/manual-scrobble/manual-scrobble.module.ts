import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManualScrobbleRoutingModule } from './manual-scrobble-routing.module';
import { ManualScrobblePageComponent } from './pages/manual-scrobble-page/manual-scrobble-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ManualScrobblePageComponent],
  imports: [CommonModule, ReactiveFormsModule, ManualScrobbleRoutingModule],
})
export class ManualScrobbleModule {}
