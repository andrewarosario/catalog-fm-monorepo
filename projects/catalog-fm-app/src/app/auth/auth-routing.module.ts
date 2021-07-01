import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LastFmAuthCallbackCompositeGuard } from './guards/last-fm-auth-callback-composite/last-fm-auth-callback-composite.guard';
import { AuthCallbackPageComponent } from './pages/auth-callback-page/auth-callback-page.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
  },
  {
    path: 'callback',
    canActivate: [LastFmAuthCallbackCompositeGuard],
    component: AuthCallbackPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
