import { mockLastFmSimpleTrackScrobble } from '../../mocks/last-fm-simple-track-scrobble.mock';
import { BulkScrobbleConverter } from './bulk-scrobble-converter.service';

const mockText = () => {
  return `Artist 1-Track 1-Album 1
Artist 2-Track 2-Album 2
Artist 3-Track 3`;
};

const makeSut = () => new BulkScrobbleConverter();

describe('BulkScrobbleConverter', () => {
  it('should be created', () => {
    const service = makeSut();
    expect(service).toBeTruthy();
  });

  it('should convert text to last.fm track', () => {
    const service = makeSut();
    const tracks = service.convert(mockText());
    expect(tracks).toEqual(mockLastFmSimpleTrackScrobble());
  });
});
