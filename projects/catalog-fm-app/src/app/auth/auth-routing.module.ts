import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LastFmAuthCallbackCompositeGuard } from './guards/last-fm-auth-callback-composite/last-fm-auth-callback-composite.guard';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
  },
  {
    path: 'callback',
    canActivate: [LastFmAuthCallbackCompositeGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
