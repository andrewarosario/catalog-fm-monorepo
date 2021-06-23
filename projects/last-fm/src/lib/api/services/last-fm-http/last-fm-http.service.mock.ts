import { of } from 'rxjs';
import { LastFmHttp } from './last-fm-http.service';

export function makeLastFmHttpSpy<T>(response: T): jasmine.SpyObj<LastFmHttp> {
  const lastFmHttpSpy = jasmine.createSpyObj<LastFmHttp>('LastFmHttpMock', ['get', 'post']);
  lastFmHttpSpy.get.and.returnValue(of(response));
  lastFmHttpSpy.post.and.returnValue(of(response));
  return lastFmHttpSpy;
}
