import { ScrobbleService } from '@/last-fm/services/scrobble/scrobble.service';
import { MOCK_LAST_FM_SCROBBLE_RESPONSE } from 'last-fm';
import { of } from 'rxjs';
import { mockLastFmSimpleTrackScrobble } from '../../mocks/last-fm-simple-track-scrobble.mock';
import { mockLastFmTextScrobble } from '../../mocks/last-fm-text-scrobble.mock';
import { BulkScrobbleConverter } from '../bulk-scrobble-converter/bulk-scrobble-converter.service';

import { BulkScrobbleService } from './bulk-scrobble.service';

const makeBulkScrobbleConverter = (): jasmine.SpyObj<BulkScrobbleConverter> => {
  return jasmine.createSpyObj<BulkScrobbleConverter>('BulkScrobbleConverter', {
    convert: mockLastFmSimpleTrackScrobble(),
  });
};

const makeScrobbleService = (): jasmine.SpyObj<ScrobbleService> => {
  return jasmine.createSpyObj<ScrobbleService>('ScrobbleService', {
    scrobble: of(MOCK_LAST_FM_SCROBBLE_RESPONSE),
  });
};

const makeSut = () => {
  const bulkScrobbleConverterSpy = makeBulkScrobbleConverter();
  const scrobbleServiceSpy = makeScrobbleService();
  const service = new BulkScrobbleService(bulkScrobbleConverterSpy, scrobbleServiceSpy);
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

  it('should return scrobble response', () => {
    const { service } = makeSut();
    service.scrobble(mockLastFmTextScrobble()).subscribe((response) => {
      expect(response).toEqual(MOCK_LAST_FM_SCROBBLE_RESPONSE);
    });
  });
});
