import { TestBed } from '@angular/core/testing';

import { CatalogFmUiService } from './catalog-fm-ui.service';

describe('CatalogFmUiService', () => {
  let service: CatalogFmUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogFmUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
