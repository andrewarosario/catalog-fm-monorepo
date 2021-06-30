import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LastFmCallbackTokenGuard } from './guards/last-fm-callback-token/last-fm-callback-token.guard';
import { AuthCallbackPageComponent } from './pages/auth-callback-page/auth-callback-page.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
  },
  {
    path: 'callback',
    canActivate: [LastFmCallbackTokenGuard],
    component: AuthCallbackPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
