import { TestBed } from '@angular/core/testing';
import { HasherService } from './hasher.service';

import * as md5 from 'md5';

// @ts-ignore
md5 = jasmine.createSpy().and.callFake((data: string) => `Hashed ${data}`);

describe('HasherService', () => {
  let service: HasherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HasherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
