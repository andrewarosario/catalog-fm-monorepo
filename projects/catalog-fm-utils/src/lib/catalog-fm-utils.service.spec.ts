import { TestBed } from '@angular/core/testing';

import { CatalogFmUtilsService } from './catalog-fm-utils.service';

describe('CatalogFmUtilsService', () => {
  let service: CatalogFmUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogFmUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
