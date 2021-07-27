import { render, screen } from '@testing-library/angular';
import { of } from 'rxjs';
import { PROGRESS_HTTP_ACTIVE } from '../progress-http-active.token';
import { DisableOnProgressDirective } from './disable-on-progress.directive';

const setup = async (isActive: boolean) => {
  await render('<button uiDisableOnProgress data-testid="sut"></button>', {
    declarations: [DisableOnProgressDirective],
    providers: [{ provide: PROGRESS_HTTP_ACTIVE, useValue: of(isActive) }],
  });
};

const getButton = () => screen.getByTestId('sut') as HTMLButtonElement;

describe('DisableOnProgressDirective', () => {
  it('should disable when Progress is active', async () => {
    await setup(true);
    expect(getButton().disabled).toBe(true);
  });

  it('should enable when Progress is not active', async () => {
    await setup(false);
    expect(getButton().disabled).toBe(false);
  });
});
