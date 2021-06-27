import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LastFmKey } from './api/models/last-fm-key';
import { LAST_FM_KEY } from './api/tokens/last-fm-key.token';

@NgModule({
  imports: [HttpClientModule],
})
export class LastFmModule {
  static forRoot(lastFmKey: LastFmKey): ModuleWithProviders<LastFmModule> {
    return {
      ngModule: LastFmModule,
      providers: [
        {
          provide: LAST_FM_KEY,
          useValue: lastFmKey,
        },
      ],
    };
  }
}
