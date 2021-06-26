import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';

@Injectable({ providedIn: 'root' })
export class LocalStorageService implements StorageService {
  getItem<T>(key: string): Promise<T> {
    const data = localStorage.getItem(key);
    return Promise.resolve(data && JSON.parse(data));
  }

  setItem<T>(key: string, value: T): Promise<void> {
    const result = localStorage.setItem(key, JSON.stringify(value));
    return Promise.resolve(result);
  }

  removeItem(key: string): Promise<void> {
    return Promise.resolve(localStorage.removeItem(key));
  }
}
