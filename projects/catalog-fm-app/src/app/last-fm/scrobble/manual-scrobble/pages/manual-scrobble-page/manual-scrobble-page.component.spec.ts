import { ReactiveFormsModule } from '@angular/forms';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { ManualScrobblePageComponent } from './manual-scrobble-page.component';

const getSubmitButton = () => screen.getByTestId('submit') as HTMLButtonElement;
const setup = async () => {
  await render(ManualScrobblePageComponent, {
    imports: [ReactiveFormsModule],
  });
};

describe('ManualScrobblePageComponent', () => {
  it('form should be valid only when typing required fields', async () => {
    await setup();
    expect(getSubmitButton().disabled).toBe(true);

    userEvent.type(screen.getByTestId('artist'), 'artist');
    userEvent.type(screen.getByTestId('track'), 'track');
    expect(getSubmitButton().disabled).toBe(false);
  });
});
