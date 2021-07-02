import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedUserLastFmGuard } from './core/auth/guards/logged-user-last-fm/logged-user-last-fm.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'last-fm',
    canActivate: [LoggedUserLastFmGuard],
    loadChildren: () => import('./last-fm/last-fm.module').then((m) => m.LastFmModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
