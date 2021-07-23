import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'scrobble', pathMatch: 'full' },
  {
    path: 'scrobble',
    loadChildren: () => import('./scrobble/scrobble.module').then((m) => m.ScrobbleModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LastFmRoutingModule {}
