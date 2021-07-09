import { Router } from '@angular/router';

export const makeRouterSpy = (): jasmine.SpyObj<Router> => {
  return jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);
};
