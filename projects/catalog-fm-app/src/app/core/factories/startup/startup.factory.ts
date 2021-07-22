import { StartupService } from '@/core/services/startup/startup.service';

export function StartupFactory(startupService: StartupService) {
  return () => startupService.load();
}
