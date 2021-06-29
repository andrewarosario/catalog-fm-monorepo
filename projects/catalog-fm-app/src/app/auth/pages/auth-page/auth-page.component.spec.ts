import { LastFmAuthRedirectService } from 'last-fm';

import { AuthPageComponent } from './auth-page.component';

const makeLastFmAuthRedirectService = (): jasmine.SpyObj<LastFmAuthRedirectService> => {
  const serviceSpy = jasmine.createSpyObj<LastFmAuthRedirectService>('LastFmAuthRedirectService', [
    'redirect',
  ]);
  return serviceSpy;
};

const makeSut = () => {
  const lastFmAuthRedirectServiceSpy = makeLastFmAuthRedirectService();
  const component = new AuthPageComponent(lastFmAuthRedirectServiceSpy);
  return { component, lastFmAuthRedirectServiceSpy };
};

describe('AuthPageComponent', () => {
  it('should create', () => {
    const { component } = makeSut();
    expect(component).toBeTruthy();
  });

  it('should call LastFmAuthRedirectService.redirect with correct values when call lastFmRedirect', () => {
    const { component, lastFmAuthRedirectServiceSpy } = makeSut();
    component.lastFmRedirect();
    expect(lastFmAuthRedirectServiceSpy.redirect).toHaveBeenCalledOnceWith('callback');
  });
});
