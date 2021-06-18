import { Injectable } from '@angular/core';
import { LastFmHttpParams } from '../../models/last-fm-http-params';
import { LastFmRequestSignatureService } from '../last-fm-request-signature/last-fm-request-signature.service';

@Injectable({
  providedIn: 'root',
})
export class LastFmHttpService {
  private readonly BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

  constructor(private lastFmRequestSignatureService: LastFmRequestSignatureService) {}

  buildUrl(params: LastFmHttpParams): string {
    const signature = this.lastFmRequestSignatureService.makeSignature(params);
    return this.completeUrl(signature, params.encode);
  }

  private completeUrl(signature: any, encode: string[] = []): string {
    return (
      this.baseUrlJson() +
      Object.keys(signature)
        .sort()
        .map((key) => this.getKeyValue(key, signature, encode))
        .join('&')
    );
  }

  private baseUrlJson(): string {
    return this.BASE_URL + '?format=json&';
  }

  private getKeyValue(key: string, signature: any, encode: string[]): string {
    const value = encode.indexOf(key) !== -1 ? this.encode(signature[key]) : signature[key];
    return key + '=' + value;
  }

  private encode(str: string): string {
    return encodeURIComponent(str).replace(/%20/g, '+');
  }
}
