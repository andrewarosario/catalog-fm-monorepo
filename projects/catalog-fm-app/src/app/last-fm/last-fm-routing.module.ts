import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedUserLastFmGuard } from './guards/logged-user-last-fm/logged-user-last-fm.guard';

const routes: Routes = [
  { path: '', redirectTo: 'scrobble', pathMatch: 'full' },
  {
    path: 'scrobble',
    canActivate: [LoggedUserLastFmGuard],
    loadChildren: () => import('./scrobble/scrobble.module').then((m) => m.ScrobbleModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LastFmRoutingModule {}
