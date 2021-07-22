import { StartupService } from '@/core/services/startup/startup.service';
import { StartupFactory } from './startup.factory';

describe('StartupFactory', () => {
  it('should call startup.load', () => {
    const startupServiceSpy = jasmine.createSpyObj<StartupService>('StartupService', ['load']);
    const factory = StartupFactory(startupServiceSpy);
    factory();
    expect(startupServiceSpy.load).toHaveBeenCalled();
  });
});
