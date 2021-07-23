import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LastFmModule } from 'last-fm';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { UiDashboardModule } from 'catalog-fm-ui';
@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    LastFmModule.forRoot(environment.lastFmKey),
    UiDashboardModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
