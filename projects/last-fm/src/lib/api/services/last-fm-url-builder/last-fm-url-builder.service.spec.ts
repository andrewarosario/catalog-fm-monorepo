import { MOCK_LAST_FM_HTTP_PARAMS } from '@/api/mocks/last-fm-http-params.mock';
import { MOCK_LAST_FM_SIGNATURE } from '@/api/mocks/last-fm-signature.mock';
import { LastFmRequestSignature } from '@/api/services/last-fm-request-signature/last-fm-request-signature.service';

import { LastFmUrlBuilder } from './last-fm-url-builder.service';

const makeLastFmRequestSignature = (): jasmine.SpyObj<LastFmRequestSignature> => {
  const lastFmRequestSignatureSpy = jasmine.createSpyObj<LastFmRequestSignature>(
    'LastFmRequestSignature',
    ['makeSignature']
  );
  lastFmRequestSignatureSpy.makeSignature.and.returnValue({
    ...MOCK_LAST_FM_SIGNATURE,
    key: 'value with space',
  });

  return lastFmRequestSignatureSpy;
};

const makeSut = () => {
  const lastFmRequestSignature = makeLastFmRequestSignature();
  const service = new LastFmUrlBuilder(lastFmRequestSignature);
  return { service, lastFmRequestSignature };
};

describe('LastFmUrlBuilder', () => {
  it('should be created', () => {
    const { service } = makeSut();
    expect(service).toBeTruthy();
  });

  it('url should start with the correct sentence', () => {
    const { service } = makeSut();
    const urlSentence = 'https://ws.audioscrobbler.com/2.0/?format=json';
    const url = service.buildUrl(MOCK_LAST_FM_HTTP_PARAMS);
    expect(url.startsWith(urlSentence)).toBeTrue();
  });

  it('should call LastFmRequestSignature.makeSignature with correct params on build url', () => {
    const { service, lastFmRequestSignature } = makeSut();
    service.buildUrl(MOCK_LAST_FM_HTTP_PARAMS);
    expect(lastFmRequestSignature.makeSignature).toHaveBeenCalledWith(MOCK_LAST_FM_HTTP_PARAMS);
  });

  it('should build url with encode', () => {
    const { service } = makeSut();
    const url = service.buildUrl({ ...MOCK_LAST_FM_HTTP_PARAMS, encode: ['key'] });
    expect(url.includes('value+with+space')).toBeTrue();
  });

  it('should build url without encode', () => {
    const { service } = makeSut();
    const url = service.buildUrl(MOCK_LAST_FM_HTTP_PARAMS);
    expect(url.includes('value with space')).toBeTrue();
  });

  it('should build url without encode on invalid encode param', () => {
    const { service } = makeSut();
    const url = service.buildUrl({ ...MOCK_LAST_FM_HTTP_PARAMS, encode: ['invalid key'] });
    expect(url.includes('value with space')).toBeTrue();
  });
});
