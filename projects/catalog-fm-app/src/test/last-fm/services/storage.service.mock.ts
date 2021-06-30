import { StorageService } from 'catalog-fm-utils';

export function makeStorageServiceSpy(): jasmine.SpyObj<StorageService> {
  return jasmine.createSpyObj<StorageService>('StorageService', [
    'getItem',
    'setItem',
    'removeItem',
  ]);
}
