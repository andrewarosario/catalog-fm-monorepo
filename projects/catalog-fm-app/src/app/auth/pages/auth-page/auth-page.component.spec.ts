import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { LastFmAuthRedirectService } from 'last-fm';

import { AuthPageComponent } from './auth-page.component';

const makeLastFmAuthRedirectService = (): jasmine.SpyObj<LastFmAuthRedirectService> => {
  const serviceSpy = jasmine.createSpyObj<LastFmAuthRedirectService>('LastFmAuthRedirectService', [
    'redirect',
  ]);
  return serviceSpy;
};

const setup = async () => {
  const lastFmAuthRedirectServiceSpy = makeLastFmAuthRedirectService();
  await render(AuthPageComponent, {
    providers: [{ provide: LastFmAuthRedirectService, useValue: lastFmAuthRedirectServiceSpy }],
  });

  return { lastFmAuthRedirectServiceSpy };
};

describe('AuthPageComponent', () => {
  it('should call LastFmAuthRedirectService.redirect with correct values when clicking the redirect button', async () => {
    const { lastFmAuthRedirectServiceSpy } = await setup();
    userEvent.click(screen.getByTestId('redirect'));
    expect(lastFmAuthRedirectServiceSpy.redirect).toHaveBeenCalledOnceWith('auth/callback');
  });
});
