import { mockLastFmSimpleTrackScrobble } from '../../mocks/last-fm-simple-track-scrobble.mock';
import { mockLastFmTextScrobble } from '../../mocks/last-fm-text-scrobble.mock';
import { BulkScrobbleConverter } from './bulk-scrobble-converter.service';

const makeSut = () => new BulkScrobbleConverter();

describe('BulkScrobbleConverter', () => {
  it('should be created', () => {
    const service = makeSut();
    expect(service).toBeTruthy();
  });

  it('should convert text to last.fm track', () => {
    const service = makeSut();
    const tracks = service.convert(mockLastFmTextScrobble());
    expect(tracks).toEqual(mockLastFmSimpleTrackScrobble());
  });
});
