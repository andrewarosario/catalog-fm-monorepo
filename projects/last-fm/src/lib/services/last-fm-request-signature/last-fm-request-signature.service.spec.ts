import { TestBed } from '@angular/core/testing';
import { MOCK_LAST_FM_HTTP_PARAMS } from '../../mocks/last-fm-http-params.mock';
import { MOCK_LAST_FM_KEY } from '../../mocks/last-fm-key.mock';
import { LAST_FM_KEY } from '../../tokens/last-fm-key.token';

import { LastFmRequestSignatureService } from './last-fm-request-signature.service';

describe('LastFmRequestSignatureService', () => {
  let service: LastFmRequestSignatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: LAST_FM_KEY, useValue: MOCK_LAST_FM_KEY }],
    });
    service = TestBed.inject(LastFmRequestSignatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
