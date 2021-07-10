import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManualScrobblePageComponent } from './pages/manual-scrobble-page/manual-scrobble-page.component';

const routes: Routes = [{ path: '', component: ManualScrobblePageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManualScrobbleRoutingModule {}
