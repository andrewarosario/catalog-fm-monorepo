import { ActivatedRouteSnapshot } from '@angular/router';

export const getAuthToken = (route: ActivatedRouteSnapshot): string => route.queryParams?.token;
