import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'bulk', pathMatch: 'full' },
  {
    path: 'manual',
    loadChildren: () =>
      import('./manual-scrobble/manual-scrobble.module').then((m) => m.ManualScrobbleModule),
  },
  {
    path: 'bulk',
    loadChildren: () =>
      import('./bulk-scrobble/bulk-scrobble.module').then((m) => m.BulkScrobbleModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScrobbleRoutingModule {}
