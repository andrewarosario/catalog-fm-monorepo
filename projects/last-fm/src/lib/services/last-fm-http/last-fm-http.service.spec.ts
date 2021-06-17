import { TestBed } from '@angular/core/testing';

import { LastFmHttpService } from './last-fm-http.service';

describe('LastFmHttpService', () => {
  let service: LastFmHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LastFmHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
