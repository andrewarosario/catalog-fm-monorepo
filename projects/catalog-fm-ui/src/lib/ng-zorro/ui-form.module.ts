import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  exports: [ReactiveFormsModule, NzFormModule, NzButtonModule],
})
export class UiFormModule {}
