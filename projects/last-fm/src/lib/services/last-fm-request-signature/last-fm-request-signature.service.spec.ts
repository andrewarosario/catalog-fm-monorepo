import { TestBed } from '@angular/core/testing';
import { HasherService } from 'projects/catalog-fm-utils/src/public-api';
import { MOCK_LAST_FM_HTTP_PARAMS } from '../../mocks/last-fm-http-params.mock';
import { MOCK_LAST_FM_KEY } from '../../mocks/last-fm-key.mock';
import { LAST_FM_KEY } from '../../tokens/last-fm-key.token';

import { LastFmRequestSignatureService } from './last-fm-request-signature.service';

describe('LastFmRequestSignatureService', () => {
  let service: LastFmRequestSignatureService;
  const hashMockValue = 'hashed';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HasherService, useValue: { hash: () => hashMockValue } },
        { provide: LAST_FM_KEY, useValue: MOCK_LAST_FM_KEY },
      ],
    });
    service = TestBed.inject(LastFmRequestSignatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make signature with correct values', () => {
    const signature = service.makeSignature(MOCK_LAST_FM_HTTP_PARAMS);
    expect(signature).toEqual({
      api_key: MOCK_LAST_FM_KEY.apiPublicKey,
      api_sig: hashMockValue,
      key: MOCK_LAST_FM_HTTP_PARAMS.data?.key,
      method: MOCK_LAST_FM_HTTP_PARAMS.method,
    });
  });
});
