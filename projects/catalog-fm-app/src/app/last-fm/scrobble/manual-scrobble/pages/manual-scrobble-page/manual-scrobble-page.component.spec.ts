import { ScrobbleService } from '@/last-fm/services/scrobble/scrobble.service';
import { makeScrobbleService } from '@/last-fm/services/scrobble/scrobble.service.mock';
import { ReactiveFormsModule } from '@angular/forms';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { ManualScrobblePageComponent } from './manual-scrobble-page.component';

const getSubmitButton = () => screen.getByTestId('submit') as HTMLButtonElement;
const setup = async () => {
  const scrobbleServiceSpy = makeScrobbleService();
  await render(ManualScrobblePageComponent, {
    imports: [ReactiveFormsModule],
    providers: [{ provide: ScrobbleService, useValue: scrobbleServiceSpy }],
  });
  return { scrobbleServiceSpy };
};

describe('ManualScrobblePageComponent', () => {
  it('form should be valid only when typing required fields', async () => {
    const { scrobbleServiceSpy } = await setup();
    expect(getSubmitButton().disabled).toBe(true);

    userEvent.type(screen.getByTestId('artist'), 'artist');
    expect(getSubmitButton().disabled).toBe(true);

    userEvent.type(screen.getByTestId('track'), 'track');
    expect(getSubmitButton().disabled).toBe(false);

    userEvent.clear(screen.getByTestId('artist'));
    userEvent.click(getSubmitButton());
    expect(scrobbleServiceSpy.scrobble).not.toHaveBeenCalled();
  });
});
