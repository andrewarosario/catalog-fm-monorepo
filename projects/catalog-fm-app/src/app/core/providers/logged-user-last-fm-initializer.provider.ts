import { LoggedUserLastFmService } from "@/auth/services/logged-user-last-fm/logged-user-last-fm.service";
import { APP_INITIALIZER, Provider } from "@angular/core";

function LoggedUserLastFmFactory(loggedUserLastFmService: LoggedUserLastFmService) {
  return () => loggedUserLastFmService.getLoggedUser()
};

export const LOGGED_USER_LAST_FM_INITIALIZER: Provider = {
  provide: APP_INITIALIZER,
  useFactory: LoggedUserLastFmFactory,
  deps: [LoggedUserLastFmService],
  multi: true,
}