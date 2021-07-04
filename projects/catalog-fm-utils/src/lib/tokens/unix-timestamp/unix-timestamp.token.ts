import { InjectionToken } from '@angular/core';

export const unixTimestamp = () => Math.floor(+new Date() / 1000);

export const UNIX_TIMESTAMP = new InjectionToken<number>('Returns unix timestamp', {
  factory: unixTimestamp,
});
