import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
  useClass: NzMessageService,
})
export abstract class UiMessageService {
  abstract success(message: string): void;
}
