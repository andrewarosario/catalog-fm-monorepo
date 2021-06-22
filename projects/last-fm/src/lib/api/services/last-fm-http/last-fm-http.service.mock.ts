import { of } from 'rxjs';
import { LastFmHttp } from './last-fm-http.service';

export class LastFmHttpMock<T> {
  private lastFmHttp = jasmine.createSpyObj<LastFmHttp>('LastFmHttpMock', ['get', 'post']);

  constructor(response: T) {
    this.lastFmHttp.get.and.returnValue(of(response));
    this.lastFmHttp.post.and.returnValue(of(response));
  }

  get spyObject(): jasmine.SpyObj<LastFmHttp> {
    return this.lastFmHttp;
  }
}
