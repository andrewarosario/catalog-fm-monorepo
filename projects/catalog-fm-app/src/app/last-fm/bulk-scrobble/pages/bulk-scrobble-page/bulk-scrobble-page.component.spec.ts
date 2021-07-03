import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  findNativeEl,
  setFieldValue,
} from 'projects/catalog-fm-app/src/test/helpers/element.spec-helpers';

import { BulkScrobblePageComponent } from './bulk-scrobble-page.component';

describe('BulkScrobblePageComponent', () => {
  let component: BulkScrobblePageComponent;
  let fixture: ComponentFixture<BulkScrobblePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [BulkScrobblePageComponent],
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
    const submitButton: HTMLButtonElement = findNativeEl(fixture, 'submit');
    expect(submitButton.disabled).toBe(true);
  });

  it('should enable button when typing some text', () => {
    setFieldValue(fixture, 'scrobble-form', 'value');
    fixture.detectChanges();
    const submitButton: HTMLButtonElement = findNativeEl(fixture, 'submit');
    expect(submitButton.disabled).toBe(false);
  });
});
