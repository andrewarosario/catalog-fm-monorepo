import { InjectionToken } from '@angular/core';
import { LastFmKey } from '@/models/last-fm-key';

export const LAST_FM_KEY = new InjectionToken<LastFmKey>('LAST_FM_KEY');
