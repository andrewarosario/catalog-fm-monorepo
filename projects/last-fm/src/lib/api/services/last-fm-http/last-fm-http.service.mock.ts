import { of } from 'rxjs';
import { LastFmHttp } from './last-fm-http.service';

export function makeLastFmHttpSpy<T>(response: T): jasmine.SpyObj<LastFmHttp> {
  return jasmine.createSpyObj<LastFmHttp>('LastFmHttpMock', {
    get: of(response),
    post: of(response),
  });
}
