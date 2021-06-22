import { HasherService } from './hasher.service';

import { Md5 } from 'ts-md5/dist/md5';

const makeSut = () => {
  const service = new HasherService();
  const hashSpy = spyOn<any>(Md5, 'hashStr').and.returnValue('hashed value');
  return { service, hashSpy };
};

describe('HasherService', () => {
  it('should be created', () => {
    const service = new HasherService();
    expect(service).toBeTruthy();
  });

  it('should call Md5.hashStr with correct value', () => {
    const { service, hashSpy } = makeSut();
    service.hash('value');
    expect(hashSpy).toHaveBeenCalledWith('value');
  });

  it('should return the correct value on hash', () => {
    const { service } = makeSut();
    const value = service.hash('value');
    expect(value).toBe('hashed value');
  });
});
