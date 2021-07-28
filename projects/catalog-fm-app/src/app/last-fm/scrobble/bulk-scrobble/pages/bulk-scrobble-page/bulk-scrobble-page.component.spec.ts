import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { BulkScrobblePageComponent } from './bulk-scrobble-page.component';
import { BulkScrobbleService } from '../../services/bulk-scrobble/bulk-scrobble.service';
import { of } from 'rxjs';
import { ScrobbleResponseType } from '@/last-fm/scrobble/enums/scrobble-response-type';
import { UiFormModule, UiMessageService } from 'catalog-fm-ui';

const getSubmitButton = () => screen.getByTestId('submit') as HTMLButtonElement;
const getScrobbleInput = () => screen.getByTestId('scrobble-input') as HTMLTextAreaElement;

const makeBulkScrobbleService = () => {
  return jasmine.createSpyObj<BulkScrobbleService>('BulkScrobbleService', {
    scrobble: of(ScrobbleResponseType.Success),
  });
};

const setup = async () => {
  const bulkScrobbleServiceSpy = makeBulkScrobbleService();
  await render(BulkScrobblePageComponent, {
    imports: [UiFormModule],
    providers: [
      { provide: BulkScrobbleService, useValue: bulkScrobbleServiceSpy },
      UiMessageService,
    ],
  });

  return { bulkScrobbleServiceSpy };
};

describe('BulkScrobblePageComponent', () => {
  it('form should be valid only when typing some text', async () => {
    const { bulkScrobbleServiceSpy } = await setup();
    expect(getSubmitButton().disabled).toBe(true);

    userEvent.type(getScrobbleInput(), 'value');
    expect(getSubmitButton().disabled).toBe(false);

    userEvent.clear(getScrobbleInput());
    expect(getSubmitButton().disabled).toBe(true);

    userEvent.click(getSubmitButton());
    expect(bulkScrobbleServiceSpy.scrobble).not.toHaveBeenCalled();
  });

  it('should scrobble tracks', async () => {
    const { bulkScrobbleServiceSpy } = await setup();
    userEvent.type(getScrobbleInput(), 'value');
    userEvent.click(getSubmitButton());
    expect(bulkScrobbleServiceSpy.scrobble).toHaveBeenCalledWith('value');
  });
});
