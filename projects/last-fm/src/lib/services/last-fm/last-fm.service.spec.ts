import { MOCK_LAST_FM_HTTP_PARAMS } from '@/mocks/last-fm-http-params.mock';
import { TestBed } from '@angular/core/testing';
import { LastFmUrlBuilder } from '../last-fm-url-builder/last-fm-url-builder.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LastFmService } from './last-fm.service';

describe('LastFmService', () => {
  let service: LastFmService;
  let lastFmUrlBuilderSpy: jasmine.SpyObj<LastFmUrlBuilder>;
  let httpMock: HttpTestingController;
  const urlMock = 'any_url';
  const getResponseMock = 'GET_RESPONSE';
  const postResponseMock = 'POST_RESPONSE';

  function makeLastFmUrlBuilderSpy(): void {
    lastFmUrlBuilderSpy = jasmine.createSpyObj<LastFmUrlBuilder>('LastFmUrlBuilder', ['buildUrl']);
    lastFmUrlBuilderSpy.buildUrl.and.returnValue(urlMock);
  }

  beforeEach(() => {
    makeLastFmUrlBuilderSpy();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: LastFmUrlBuilder, useValue: lastFmUrlBuilderSpy }],
    });
    service = TestBed.inject(LastFmService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call LastFmUrlBuilder.buildUrl with correct values on get', () => {
    service.get(MOCK_LAST_FM_HTTP_PARAMS);
    expect(lastFmUrlBuilderSpy.buildUrl).toHaveBeenCalledWith(MOCK_LAST_FM_HTTP_PARAMS);
  });

  it('should call LastFmUrlBuilder.buildUrl with correct values on post', () => {
    service.post(MOCK_LAST_FM_HTTP_PARAMS);
    expect(lastFmUrlBuilderSpy.buildUrl).toHaveBeenCalledWith(MOCK_LAST_FM_HTTP_PARAMS);
  });

  it('should return the right data from get function', () => {
    let returnResponse: any = null;
    service.get(MOCK_LAST_FM_HTTP_PARAMS).subscribe((response) => (returnResponse = response));

    const req = httpMock.expectOne(urlMock);
    req.flush(getResponseMock);

    expect(req.request.method).toEqual('GET');
    expect(returnResponse).toBe(getResponseMock);
  });

  it('should return the right data from post function', () => {
    let returnResponse: any = null;
    service.post(MOCK_LAST_FM_HTTP_PARAMS).subscribe((response) => (returnResponse = response));

    const req = httpMock.expectOne(urlMock);
    req.flush(postResponseMock);

    expect(req.request.method).toEqual('POST');
    expect(returnResponse).toBe(postResponseMock);
  });
});
