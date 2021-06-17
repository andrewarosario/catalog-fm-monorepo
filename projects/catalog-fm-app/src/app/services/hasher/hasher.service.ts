import { Injectable } from '@angular/core';
import * as md5 from 'md5';

@Injectable({
  providedIn: 'root',
})
export class HasherService {
  hash(data: string): string {
    return md5(data);
  }
}
