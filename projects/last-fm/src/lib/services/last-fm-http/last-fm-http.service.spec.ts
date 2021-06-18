import { TestBed } from '@angular/core/testing';
import { MOCK_LAST_FM_HTTP_PARAMS } from '../../mocks/last-fm-http-params.mock';
import { MOCK_LAST_FM_SIGNATURE } from '../../mocks/last-fm-signature.mock';
import { LastFmRequestSignatureService } from '../last-fm-request-signature/last-fm-request-signature.service';

import { LastFmHttpService } from './last-fm-http.service';

describe('LastFmHttpService', () => {
  let service: LastFmHttpService;
  let lastFmRequestSignatureServiceSpy: jasmine.SpyObj<LastFmRequestSignatureService>;

  function makeLastFmRequestSignatureServiceSpy() {
    lastFmRequestSignatureServiceSpy = TestBed.inject(
      LastFmRequestSignatureService
    ) as jasmine.SpyObj<LastFmRequestSignatureService>;
    lastFmRequestSignatureServiceSpy.makeSignature.and.returnValue({
      ...MOCK_LAST_FM_SIGNATURE,
      key: 'value with space',
    });
  }

  beforeEach(() => {
    const makeSignatureSpy = jasmine.createSpyObj<LastFmRequestSignatureService>(
      'LastFmRequestSignatureService',
      ['makeSignature']
    );

    TestBed.configureTestingModule({
      providers: [
        {
          provide: LastFmRequestSignatureService,
          useValue: makeSignatureSpy,
        },
      ],
    });
    service = TestBed.inject(LastFmHttpService);
    makeLastFmRequestSignatureServiceSpy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('url should start with the correct sentence', () => {
    const urlSentence = 'https://ws.audioscrobbler.com/2.0/?format=json';
    const url = service.buildUrl(MOCK_LAST_FM_HTTP_PARAMS);
    expect(url.startsWith(urlSentence)).toBeTrue();
  });

  it('should call LastFmRequestSignatureService.makeSignature with correct params on build url', () => {
    service.buildUrl(MOCK_LAST_FM_HTTP_PARAMS);
    expect(lastFmRequestSignatureServiceSpy.makeSignature).toHaveBeenCalledWith(
      MOCK_LAST_FM_HTTP_PARAMS
    );
  });

  it('should build url with encode', () => {
    const url = service.buildUrl({ ...MOCK_LAST_FM_HTTP_PARAMS, encode: ['key'] });
    expect(url.includes('value+with+space')).toBeTrue();
  });

  it('should build url without encode', () => {
    const url = service.buildUrl(MOCK_LAST_FM_HTTP_PARAMS);
    expect(url.includes('value with space')).toBeTrue();
  });

  it('should build url without encode on invalid encode param', () => {
    const url = service.buildUrl({ ...MOCK_LAST_FM_HTTP_PARAMS, encode: ['invalid key'] });
    expect(url.includes('value with space')).toBeTrue();
  });
});
