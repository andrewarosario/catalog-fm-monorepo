import { TestBed } from '@angular/core/testing';
import { HasherService } from 'projects/catalog-fm-utils/src/public-api';
import { MOCK_LAST_FM_HTTP_PARAMS } from '../../mocks/last-fm-http-params.mock';
import { MOCK_LAST_FM_KEY } from '../../mocks/last-fm-key.mock';
import { MOCK_LAST_FM_SIGNATURE } from '../../mocks/last-fm-signature.mock';
import { LAST_FM_KEY } from '../../tokens/last-fm-key.token';

import { LastFmRequestSignatureService } from './last-fm-request-signature.service';

describe('LastFmRequestSignatureService', () => {
  let service: LastFmRequestSignatureService;
  let hasherServiceSpy: jasmine.SpyObj<HasherService>;
  const hashMockValue = 'hashed';

  function makeHasherServiceSpy() {
    hasherServiceSpy = TestBed.inject(HasherService) as jasmine.SpyObj<HasherService>;
    hasherServiceSpy.hash.and.returnValue(hashMockValue);
  }

  beforeEach(() => {
    const hashSpy = jasmine.createSpyObj<HasherService>('HasherService', ['hash']);

    TestBed.configureTestingModule({
      providers: [
        { provide: HasherService, useValue: hashSpy },
        { provide: LAST_FM_KEY, useValue: MOCK_LAST_FM_KEY },
      ],
    });
    service = TestBed.inject(LastFmRequestSignatureService);
    makeHasherServiceSpy();
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
