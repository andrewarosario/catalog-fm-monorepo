import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
  useClass: LocalStorageService,
})
export abstract class StorageService {
  abstract getItem<T>(key: string): Promise<T>;
  abstract setItem<T>(key: string, value: any): Promise<void>;
  abstract removeItem(key: string): Promise<void>;
}
