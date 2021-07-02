import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkScrobblePageComponent } from './bulk-scrobble-page.component';

describe('BulkScrobblePageComponent', () => {
  let component: BulkScrobblePageComponent;
  let fixture: ComponentFixture<BulkScrobblePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkScrobblePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkScrobblePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
