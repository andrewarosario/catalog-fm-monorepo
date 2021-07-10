import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualScrobblePageComponent } from './manual-scrobble-page.component';

describe('ManualScrobblePageComponent', () => {
  let component: ManualScrobblePageComponent;
  let fixture: ComponentFixture<ManualScrobblePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualScrobblePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualScrobblePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
