import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LastFmCallbackAuthGuard } from './guards/last-fm-callback-auth/last-fm-callback-auth.guard';
import { AuthCallbackPageComponent } from './pages/auth-callback-page/auth-callback-page.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
  },
  {
    path: 'callback',
    canActivate: [LastFmCallbackAuthGuard],
    component: AuthCallbackPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
