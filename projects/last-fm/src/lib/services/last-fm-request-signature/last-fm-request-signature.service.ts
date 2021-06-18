import { Inject, Injectable } from '@angular/core';
import { HasherService } from 'catalog-fm-utils';
import { LastFmHttpParams } from '@/models/last-fm-http-params';
import { LastFmKey } from '@/models/last-fm-key';
import { LAST_FM_KEY } from '@/tokens/last-fm-key.token';

@Injectable({
  providedIn: 'root',
})
export class LastFmRequestSignature {
  constructor(
    @Inject(LAST_FM_KEY) private lastFmKey: LastFmKey,
    private hasherService: HasherService
  ) {}

  makeSignature(params: LastFmHttpParams): any {
    const allHashData = this.makeRequestDataWithApiKey(params);
    const hash = this.makeHash(allHashData);

    return this.makeAllUrlData(allHashData, hash);
  }

  private makeRequestDataWithApiKey({ method, data = {} }: LastFmHttpParams): any {
    return Object.assign({}, data, { api_key: this.lastFmKey.apiPublicKey, method });
  }

  private makeHash(allHashData: any): string {
    const stringHash =
      Object.keys(allHashData)
        .sort()
        .map((key) => key + allHashData[key])
        .join('') + this.lastFmKey.apiSecretKey;

    return this.hasherService.hash(stringHash);
  }

  private makeAllUrlData(allHashData: any, hash: string): any {
    return Object.assign({}, allHashData, { api_sig: hash });
  }
}
