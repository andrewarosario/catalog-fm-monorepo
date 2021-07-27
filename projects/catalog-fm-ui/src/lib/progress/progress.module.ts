import { NgModule } from '@angular/core';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { DisableOnProgressDirective } from './disable-on-progress/disable-on-progress.directive';

@NgModule({
  declarations: [ProgressBarComponent, DisableOnProgressDirective],
  exports: [ProgressBarComponent, DisableOnProgressDirective],
  imports: [HttpClientModule, NgProgressModule, NgProgressHttpModule],
})
export class UiProgressModule {}
