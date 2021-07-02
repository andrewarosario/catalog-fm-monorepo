import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BulkScrobblePageComponent } from './pages/bulk-scrobble-page/bulk-scrobble-page.component';

const routes: Routes = [{ path: '', component: BulkScrobblePageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BulkScrobbleRoutingModule {}
