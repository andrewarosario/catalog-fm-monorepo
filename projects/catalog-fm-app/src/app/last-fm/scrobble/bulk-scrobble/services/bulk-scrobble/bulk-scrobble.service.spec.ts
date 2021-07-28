import { ScrobbleResponseType } from '@/last-fm/scrobble/enums/scrobble-response-type';
import { ScrobbleStrategyService } from '@/last-fm/scrobble/services/scrobble-strategy/scrobble-strategy.service';
import { makeScrobbleService } from '@/last-fm/scrobble/services/scrobble/scrobble.service.mock';
import { TestBed } from '@angular/core/testing';
import { mockLastFmSimpleTrackScrobble } from '../../mocks/last-fm-simple-track-scrobble.mock';
import { mockLastFmTextScrobble } from '../../mocks/last-fm-text-scrobble.mock';
import { BulkScrobbleConverter } from '../bulk-scrobble-converter/bulk-scrobble-converter.service';

import { BulkScrobbleService } from './bulk-scrobble.service';

const makeBulkScrobbleConverter = (): jasmine.SpyObj<BulkScrobbleConverter> => {
  return jasmine.createSpyObj<BulkScrobbleConverter>('BulkScrobbleConverter', {
    convert: mockLastFmSimpleTrackScrobble(),
  });
};

const makeSut = () => {
  const bulkScrobbleConverterSpy = makeBulkScrobbleConverter();
  const scrobbleServiceSpy = makeScrobbleService();
  TestBed.configureTestingModule({
    providers: [
      { provide: ScrobbleStrategyService, useValue: scrobbleServiceSpy },
      { provide: BulkScrobbleConverter, useValue: bulkScrobbleConverterSpy },
    ],
  });
  const service = TestBed.inject(BulkScrobbleService);
  return { service, bulkScrobbleConverterSpy, scrobbleServiceSpy };
};

describe('BulkScrobbleService', () => {
  it('should be created', () => {
    const { service } = makeSut();
    expect(service).toBeTruthy();
  });

  it('should call bulkScrobbleConverter with correct value', () => {
    const { service, bulkScrobbleConverterSpy } = makeSut();
    service.scrobble(mockLastFmTextScrobble());
    expect(bulkScrobbleConverterSpy.convert).toHaveBeenCalledWith(mockLastFmTextScrobble());
  });

  it('should map all tracks with scrobbleService', () => {
    const { service, scrobbleServiceSpy } = makeSut();
    service.scrobble(mockLastFmTextScrobble());
    for (const track of mockLastFmSimpleTrackScrobble()) {
      expect(scrobbleServiceSpy.scrobble).toHaveBeenCalledWith(track);
    }
  });

  it('should return scrobble type response', () => {
    const { service } = makeSut();
    const expectedResponse = Array(mockLastFmSimpleTrackScrobble().length).fill(
      ScrobbleResponseType.Success
    );
    service.scrobble(mockLastFmTextScrobble()).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });
  });
});
