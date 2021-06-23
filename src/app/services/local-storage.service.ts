import { Injectable } from '@angular/core';

type LocalStorageItem = {
  key: string;
  value: any;
  expiresIn: Date;
};

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setItem(item: LocalStorageItem) {
    const { key, value, expiresIn } = item;
    const cache = {
      value,
      expiresIn,
    };
    window.localStorage.setItem(this.buildCacheKey(key), JSON.stringify(cache));
  }

  getItem(key: string) {
    const cachedItem = window.localStorage.getItem(this.buildCacheKey(key));

    if (cachedItem) {
      const item = JSON.parse(cachedItem) as LocalStorageItem;
      item.expiresIn = new Date(item.expiresIn);
      if (item.expiresIn.getTime() >= new Date().getTime()) {
        return item;
      }
    }

    window.localStorage.removeItem(this.buildCacheKey(key));
    return null;
  }

  private buildCacheKey(key: string): string {
    return `cache.${key}`;
  }
}
