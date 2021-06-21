import { MOCK_LAST_FM_HTTP_PARAMS } from '@/mocks/last-fm-http-params.mock';
import { TestBed } from '@angular/core/testing';
import { LastFmHttp } from '../last-fm-http/last-fm-http.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LastFmService } from './last-fm.service';

describe('LastFmService', () => {
  let service: LastFmService;
  let lastFmHttpSpy: jasmine.SpyObj<LastFmHttp>;
  let httpMock: HttpTestingController;
  const urlMock = 'any_url';
  const getResponseMock = 'GET_RESPONSE';
  const postResponseMock = 'POST_RESPONSE';

  function makeLastFmHttpSpy(): void {
    lastFmHttpSpy = jasmine.createSpyObj<LastFmHttp>('LastFmHttp', ['buildUrl']);
    lastFmHttpSpy.buildUrl.and.returnValue(urlMock);
  }

  beforeEach(() => {
    makeLastFmHttpSpy();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: LastFmHttp, useValue: lastFmHttpSpy }],
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

  it('should call LastFmHttp.buildUrl with correct values on get', () => {
    service.get(MOCK_LAST_FM_HTTP_PARAMS);
    expect(lastFmHttpSpy.buildUrl).toHaveBeenCalledWith(MOCK_LAST_FM_HTTP_PARAMS);
  });

  it('should call LastFmHttp.buildUrl with correct values on post', () => {
    service.post(MOCK_LAST_FM_HTTP_PARAMS);
    expect(lastFmHttpSpy.buildUrl).toHaveBeenCalledWith(MOCK_LAST_FM_HTTP_PARAMS);
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
