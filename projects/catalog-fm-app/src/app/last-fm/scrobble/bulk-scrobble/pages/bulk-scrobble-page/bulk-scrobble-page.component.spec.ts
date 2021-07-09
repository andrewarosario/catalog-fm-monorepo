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

const getSubmitButton = () => screen.getByTestId('submit') as HTMLButtonElement;
const getScrobbleInput = () => screen.getByTestId('scrobble-input') as HTMLTextAreaElement;

const setup = async () => {
  await render(BulkScrobblePageComponent, {
    imports: [ReactiveFormsModule],
    componentProviders: [{ provide: BulkScrobbleService, useValue: bulkScrobbleServiceSpy }],
  });
};

describe('BulkScrobblePageComponent', () => {
  it('form should be valid only when typing some text', async () => {
    await setup();
    expect(getSubmitButton().disabled).toBe(true);

    userEvent.type(getScrobbleInput(), 'value');
    expect(getSubmitButton().disabled).toBe(false);

    userEvent.clear(getScrobbleInput());
    expect(getSubmitButton().disabled).toBe(true);

    fireEvent.click(getSubmitButton());
  });

  it('should scrobble tracks', async () => {
    await setup();
    userEvent.type(getScrobbleInput(), 'value');
    fireEvent.click(getSubmitButton());
    expect(bulkScrobbleServiceSpy.scrobble).toHaveBeenCalledWith('value');
  });
});
