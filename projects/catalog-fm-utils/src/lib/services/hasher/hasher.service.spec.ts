import { TestBed } from '@angular/core/testing';
import { HasherService } from './hasher.service';

import { Md5 } from 'ts-md5/dist/md5';

describe('HasherService', () => {
  let service: HasherService;
  let hashSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HasherService);
    hashSpy = spyOn<any>(Md5, 'hashStr').and.returnValue('hashed value');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call Md5.hashStr with correct value', () => {
    service.hash('value');
    expect(hashSpy).toHaveBeenCalledWith('value');
  });

  it('should return the correct value on hash', () => {
    const value = service.hash('value');
    expect(value).toBe('hashed value');
  });
});
