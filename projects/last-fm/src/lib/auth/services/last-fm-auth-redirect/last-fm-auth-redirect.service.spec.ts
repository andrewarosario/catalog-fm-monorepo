import { MOCK_LAST_FM_KEY } from '@/api/mocks/last-fm-key.mock';
import { WINDOW } from 'catalog-fm-utils';
import { MOCK_WINDOW } from 'catalog-fm-utils';
import { TestBed } from '@angular/core/testing';

import { LastFmAuthRedirectService } from './last-fm-auth-redirect.service';
import { LAST_FM_KEY } from '@/api/tokens/last-fm-key.token';

let service: LastFmAuthRedirectService;
let setHrefSpy: jasmine.Spy;

describe('LastFmAuthRedirectService', () => {
  beforeEach(() => {
    setHrefSpy = spyOnProperty(MOCK_WINDOW.location, 'href', 'set');
    TestBed.configureTestingModule({
      providers: [
        LastFmAuthRedirectService,
        { provide: WINDOW, useValue: MOCK_WINDOW },
        { provide: LAST_FM_KEY, useValue: MOCK_LAST_FM_KEY },
      ],
    });
    service = TestBed.inject(LastFmAuthRedirectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should modify window.location without redirect url', () => {
    const url = 'http://www.last.fm/api/auth/?api_key=PUBLIC_KEY&cb=http%3A%2F%2Forigin%2F';
    service.redirect();
    expect(setHrefSpy).toHaveBeenCalledWith(url);
  });

  it('should modify window.location with redirect url', () => {
    const redirect = 'redirect';
    const url = `http://www.last.fm/api/auth/?api_key=PUBLIC_KEY&cb=http%3A%2F%2Forigin%2F${redirect}`;
    service.redirect(redirect);
    expect(setHrefSpy).toHaveBeenCalledWith(url);
  });
});
