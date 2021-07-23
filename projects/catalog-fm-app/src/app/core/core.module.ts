import { APP_INITIALIZER, NgModule } from '@angular/core';
import { StartupFactory } from './factories/startup/startup.factory';
import { StartupService } from './services/startup/startup.service';

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: StartupFactory,
      deps: [StartupService],
      multi: true,
    },
  ],
})
export class CoreModule {}
