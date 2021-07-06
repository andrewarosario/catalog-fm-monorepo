import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateHelper {
  get unixTimestamp(): number {
    return Math.floor(+new Date() / 1000);
  }
}
