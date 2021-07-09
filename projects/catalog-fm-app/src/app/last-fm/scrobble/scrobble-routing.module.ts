import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'bulk' },
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
