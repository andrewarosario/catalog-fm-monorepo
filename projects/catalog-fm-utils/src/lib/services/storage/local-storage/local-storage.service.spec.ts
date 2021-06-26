import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

let service: LocalStorageService;
describe('LocalStorageService', () => {
  beforeEach(() => {
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getItem with correct values', async () => {
    const getItemSpy = spyOn(localStorage, 'getItem');
    await service.getItem('key');
    expect(getItemSpy).toHaveBeenCalledWith('key');
  });

  it('should getItem return undefined when there is no one value', async () => {
    spyOn(localStorage, 'getItem').and.returnValue(undefined);
    const value = await service.getItem('key');
    expect(value).toBe(undefined);
  });

  it('should getItem return parsed value', async () => {
    const jsonData = JSON.stringify({ data: 'value' });
    spyOn(localStorage, 'getItem').and.returnValue(jsonData);
    const value = await service.getItem('key');
    expect(value).toEqual(JSON.parse(jsonData));
  });

  it('should call setItem with correct values', async () => {
    const setItemSpy = spyOn(localStorage, 'setItem');
    await service.setItem('key', 'value');
    expect(setItemSpy).toHaveBeenCalledWith('key', JSON.stringify('value'));
  });

  it('should call removeItem with correct value', async () => {
    const removeItemSpy = spyOn(localStorage, 'removeItem');
    await service.removeItem('key');
    expect(removeItemSpy).toHaveBeenCalledWith('key');
  });
});
