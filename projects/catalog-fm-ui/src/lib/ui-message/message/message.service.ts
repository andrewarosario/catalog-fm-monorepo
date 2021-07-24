import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
  useClass: NzMessageService,
})
export abstract class MessageService {
  abstract success(message: string): void;
}
