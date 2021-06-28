import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LastFmModule } from 'last-fm';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, LastFmModule.forRoot(environment.lastFmKey)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
