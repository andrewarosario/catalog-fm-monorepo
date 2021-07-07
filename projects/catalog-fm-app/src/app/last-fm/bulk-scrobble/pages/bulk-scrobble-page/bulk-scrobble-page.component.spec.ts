import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  click,
  findNativeEl,
  setFieldValue,
} from 'projects/catalog-fm-app/src/test/helpers/element.spec-helpers';
import { BulkScrobbleService } from '../../services/bulk-scrobble/bulk-scrobble.service';

import { BulkScrobblePageComponent } from './bulk-scrobble-page.component';

describe('BulkScrobblePageComponent', () => {
  let component: BulkScrobblePageComponent;
  let fixture: ComponentFixture<BulkScrobblePageComponent>;

  const bulkScrobbleServiceSpy = jasmine.createSpyObj<BulkScrobbleService>('BulkScrobbleService', [
    'scrobble',
  ]);
  const getSubmitButton = (): HTMLButtonElement => findNativeEl(fixture, 'submit');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [BulkScrobblePageComponent],
      providers: [{ provide: BulkScrobbleService, useValue: bulkScrobbleServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkScrobblePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submit button should be disabled on init', () => {
    const submitButton = getSubmitButton();
    expect(submitButton.disabled).toBe(true);
  });

  it('should enable button when typing some text', () => {
    setFieldValue(fixture, 'scrobble-form', 'value');
    fixture.detectChanges();
    const submitButton = getSubmitButton();
    expect(submitButton.disabled).toBe(false);
  });

  it('should disable button when typing blank text', () => {
    setFieldValue(fixture, 'scrobble-form', 'value');
    fixture.detectChanges();
    setFieldValue(fixture, 'scrobble-form', '');
    fixture.detectChanges();
    const submitButton = getSubmitButton();
    expect(submitButton.disabled).toBe(true);
  });

  it('should scrobble tracks', () => {
    setFieldValue(fixture, 'scrobble-form', 'value');
    fixture.detectChanges();
    click(fixture, 'submit');
    expect(bulkScrobbleServiceSpy.scrobble).toHaveBeenCalledWith('value');
  });
});
