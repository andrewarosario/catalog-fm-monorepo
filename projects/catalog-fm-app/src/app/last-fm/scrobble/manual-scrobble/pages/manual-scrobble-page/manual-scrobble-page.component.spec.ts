import { ScrobbleService } from '@/last-fm/services/scrobble/scrobble.service';
import { makeScrobbleService } from '@/last-fm/services/scrobble/scrobble.service.mock';
import { ReactiveFormsModule } from '@angular/forms';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { MOCK_LAST_FM_SIMPLE_TRACK } from 'last-fm';
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

    userEvent.type(screen.getByTestId('artist'), MOCK_LAST_FM_SIMPLE_TRACK.artist);
    expect(getSubmitButton().disabled).toBe(true);

    userEvent.type(screen.getByTestId('track'), MOCK_LAST_FM_SIMPLE_TRACK.track);
    expect(getSubmitButton().disabled).toBe(false);

    userEvent.clear(screen.getByTestId('artist'));
    userEvent.click(getSubmitButton());
    expect(scrobbleServiceSpy.scrobble).not.toHaveBeenCalled();
  });

  it('should scrobble track', async () => {
    const { scrobbleServiceSpy } = await setup();
    userEvent.type(screen.getByTestId('artist'), MOCK_LAST_FM_SIMPLE_TRACK.artist);
    userEvent.type(screen.getByTestId('track'), MOCK_LAST_FM_SIMPLE_TRACK.track);
    userEvent.type(screen.getByTestId('album'), MOCK_LAST_FM_SIMPLE_TRACK.album);
    userEvent.click(getSubmitButton());
    expect(scrobbleServiceSpy.scrobble).toHaveBeenCalledWith(MOCK_LAST_FM_SIMPLE_TRACK);
  });
});
