import { NgModule } from '@angular/core';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { UiMessageService } from './message.service';

@NgModule({
  imports: [NzMessageModule],
  providers: [{ provide: UiMessageService, useClass: NzMessageService }],
})
export class UiMessageModule {}
