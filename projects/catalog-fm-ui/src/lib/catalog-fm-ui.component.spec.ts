import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogFmUiComponent } from './catalog-fm-ui.component';

describe('CatalogFmUiComponent', () => {
  let component: CatalogFmUiComponent;
  let fixture: ComponentFixture<CatalogFmUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogFmUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogFmUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
