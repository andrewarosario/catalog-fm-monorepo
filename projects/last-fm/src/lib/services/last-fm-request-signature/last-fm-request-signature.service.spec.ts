import { TestBed } from '@angular/core/testing';
import { HasherService } from 'catalog-fm-utils';
import { MOCK_LAST_FM_HTTP_PARAMS } from '../../mocks/last-fm-http-params.mock';
import { MOCK_LAST_FM_KEY } from '../../mocks/last-fm-key.mock';
import { MOCK_LAST_FM_SIGNATURE } from '../../mocks/last-fm-signature.mock';
import { LAST_FM_KEY } from '../../tokens/last-fm-key.token';

import { LastFmRequestSignature } from './last-fm-request-signature.service';

describe('LastFmRequestSignature', () => {
  let service: LastFmRequestSignature;
  let hasherServiceSpy: jasmine.SpyObj<HasherService>;

  function makeHasherServiceSpy(): void {
    const hashMockValue = 'hashed';
    hasherServiceSpy = jasmine.createSpyObj<HasherService>('HasherService', ['hash']);
    hasherServiceSpy.hash.and.returnValue(hashMockValue);
  }

  beforeEach(() => {
    makeHasherServiceSpy();

    TestBed.configureTestingModule({
      providers: [
        { provide: HasherService, useValue: hasherServiceSpy },
        { provide: LAST_FM_KEY, useValue: MOCK_LAST_FM_KEY },
      ],
    });
    service = TestBed.inject(LastFmRequestSignature);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call HasherService.hash on make signature', () => {
    service.makeSignature(MOCK_LAST_FM_HTTP_PARAMS);
    expect(hasherServiceSpy.hash).toHaveBeenCalled();
  });

  it('should make signature with correct values', () => {
    const signature = service.makeSignature(MOCK_LAST_FM_HTTP_PARAMS);
    expect(signature).toEqual(MOCK_LAST_FM_SIGNATURE);
  });
});
