import { render, screen, fireEvent } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { BulkScrobblePageComponent } from './bulk-scrobble-page.component';
import { BulkScrobbleService } from '../../services/bulk-scrobble/bulk-scrobble.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { MOCK_LAST_FM_SCROBBLE_RESPONSE } from 'last-fm';

const bulkScrobbleServiceSpy = jasmine.createSpyObj<BulkScrobbleService>('BulkScrobbleService', {
  scrobble: of(MOCK_LAST_FM_SCROBBLE_RESPONSE),
});

describe('BulkScrobblePageComponent', () => {
  it('submit button should be disabled on init', async () => {
    await render(BulkScrobblePageComponent, {
      imports: [ReactiveFormsModule],
      componentProviders: [{ provide: BulkScrobbleService, useValue: bulkScrobbleServiceSpy }],
    });
    const submitButton = screen.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
  });

  it('should enable button only when typing some text', async () => {
    await render(BulkScrobblePageComponent, {
      imports: [ReactiveFormsModule],
      componentProviders: [{ provide: BulkScrobbleService, useValue: bulkScrobbleServiceSpy }],
    });

    userEvent.type(screen.getByTestId('scrobble-form'), 'value');
    const submitButton = screen.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);

    userEvent.clear(screen.getByTestId('scrobble-form'));
    expect(submitButton.disabled).toBe(true);
  });

  it('should scrobble tracks', async () => {
    await render(BulkScrobblePageComponent, {
      imports: [ReactiveFormsModule],
      componentProviders: [{ provide: BulkScrobbleService, useValue: bulkScrobbleServiceSpy }],
    });
    userEvent.type(screen.getByTestId('scrobble-form'), 'value');
    const submitButton = screen.getByTestId('submit') as HTMLButtonElement;
    fireEvent.click(submitButton);

    expect(bulkScrobbleServiceSpy.scrobble).toHaveBeenCalledWith('value');
  });
});
