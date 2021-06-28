import { MOCK_WINDOW } from '@/tokens/window/window.mock';
import { WINDOW } from '@/tokens/window/window.token';
import { TestBed } from '@angular/core/testing';

import { ConnectionStatusService } from './connection-status.service';

describe('ConnectionStatusService', () => {
  let service: ConnectionStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: WINDOW, useValue: MOCK_WINDOW }],
    });
    service = TestBed.inject(ConnectionStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be online when navigator.onLine is true', () => {
    MOCK_WINDOW.navigator.onLine = true;
    expect(service.isOnline).toBe(true);
  });

  it('should be offline when navigator.onLine is false', () => {
    MOCK_WINDOW.navigator.onLine = false;
    expect(service.isOnline).toBe(false);
  });
});
