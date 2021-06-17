import { Inject, Injectable } from '@angular/core';
import { LastFmKey } from '../../models/last-fm-key';
import { LAST_FM_KEY } from '../../tokens/last-fm-key.token';

@Injectable({
  providedIn: 'root',
})
export class LastFmHttpService {
  private readonly BASE_URL = 'https://ws.audioscrobbler.com/2.0/';
}
