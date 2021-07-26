import { NgModule } from '@angular/core';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ProgressBarComponent],
  exports: [ProgressBarComponent],
  imports: [HttpClientModule, NgProgressModule, NgProgressHttpModule],
})
export class UiProgressBarModule {}
