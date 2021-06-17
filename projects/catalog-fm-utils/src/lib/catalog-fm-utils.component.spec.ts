import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogFmUtilsComponent } from './catalog-fm-utils.component';

describe('CatalogFmUtilsComponent', () => {
  let component: CatalogFmUtilsComponent;
  let fixture: ComponentFixture<CatalogFmUtilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogFmUtilsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogFmUtilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
