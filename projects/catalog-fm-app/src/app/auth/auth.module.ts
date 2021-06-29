import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { AuthCallbackPageComponent } from './pages/auth-callback-page/auth-callback-page.component';

@NgModule({
  declarations: [AuthPageComponent, AuthCallbackPageComponent],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
