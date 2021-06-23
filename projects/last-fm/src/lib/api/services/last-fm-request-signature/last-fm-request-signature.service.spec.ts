import { HasherService } from 'catalog-fm-utils';
import { MOCK_LAST_FM_HTTP_PARAMS } from '../../mocks/last-fm-http-params.mock';
import { MOCK_LAST_FM_KEY } from '../../mocks/last-fm-key.mock';
import { MOCK_LAST_FM_SIGNATURE } from '../../mocks/last-fm-signature.mock';

import { LastFmRequestSignature } from './last-fm-request-signature.service';

const makeHasherService = (): jasmine.SpyObj<HasherService> => {
  const hashMockValue = 'hashed';
  const hasherServiceSpy = jasmine.createSpyObj<HasherService>('HasherService', ['hash']);
  hasherServiceSpy.hash.and.returnValue(hashMockValue);
  return hasherServiceSpy;
};

const makeSut = () => {
  const hasherService = makeHasherService();
  const service = new LastFmRequestSignature(MOCK_LAST_FM_KEY, hasherService);
  return { service, hasherService };
};

describe('LastFmRequestSignature', () => {
  it('should be created', () => {
    const { service } = makeSut();
    expect(service).toBeTruthy();
  });

  it('should call HasherService.hash on make signature', () => {
    const { service, hasherService } = makeSut();
    service.makeSignature(MOCK_LAST_FM_HTTP_PARAMS);
    expect(hasherService.hash).toHaveBeenCalled();
  });

  it('should make signature with correct values', () => {
    const { service } = makeSut();
    const signature = service.makeSignature(MOCK_LAST_FM_HTTP_PARAMS);
    expect(signature).toEqual(MOCK_LAST_FM_SIGNATURE);
  });
});
