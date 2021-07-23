import { ScrobbleSynchronizationService } from '@/last-fm/scrobble/services/scrobble-synchronization/scrobble-synchronization.service';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { StartupService } from './startup.service';

const makeScrobbleSynchronizationServiceSpy =
  (): jasmine.SpyObj<ScrobbleSynchronizationService> => {
    return jasmine.createSpyObj<ScrobbleSynchronizationService>('ScrobbleSynchronizationService', {
      synchronizeScrobbles: of(),
    });
  };

const makeSut = () => {
  const scrobbleSynchronizationServiceSpy = makeScrobbleSynchronizationServiceSpy();
  const service = new StartupService(scrobbleSynchronizationServiceSpy);
  return { service, scrobbleSynchronizationServiceSpy };
};

describe('StartupService', () => {
  it('should be created', () => {
    const { service } = makeSut();
    expect(service).toBeTruthy();
  });

  it('should call scrobbleSynchronizationService.synchronizeScrobbles on load', () => {
    const { service, scrobbleSynchronizationServiceSpy } = makeSut();
    service.load();
    expect(scrobbleSynchronizationServiceSpy.synchronizeScrobbles).toHaveBeenCalled();
  });
});
