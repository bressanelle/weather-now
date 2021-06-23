import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  beforeEach(() => {
    window.localStorage.removeItem('cache.test');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store an item', () => {
    const date = new Date();
    const cacheDate = new Date(
      new Date(date).setMinutes(date.getMinutes() + 10)
    );

    const item = {
      key: 'test',
      value: {
        prop1: 1,
        prop2: false,
        prop3: '',
      },
      expiresIn: cacheDate,
    };

    service.setItem(item);

    expect(window.localStorage.getItem('cache.test')).not.toBeNull();
  });

  it('should return a stored item', () => {
    const date = new Date();
    const cacheDate = new Date(
      new Date(date).setMinutes(date.getMinutes() + 10)
    );

    const item = {
      key: 'test',
      value: {
        prop1: 1,
        prop2: false,
        prop3: '',
      },
      expiresIn: cacheDate,
    };

    service.setItem(item);
    const receivedItem = service.getItem('test');

    expect(receivedItem).not.toBeNull();
    expect(receivedItem?.value.prop1).toBe(1);
  });

  it('should return null if stored item has expired', () => {
    const date = new Date();
    const cacheDate = new Date(
      new Date(date).setMinutes(date.getMinutes() - 10)
    );

    const item = {
      key: 'test',
      value: {
        prop1: 1,
        prop2: false,
        prop3: '',
      },
      expiresIn: cacheDate,
    };

    service.setItem(item);
    const receivedItem = service.getItem('test');

    expect(receivedItem).toBeNull();
  });

  it('should return null if no item match with key', () => {
    const date = new Date();
    const cacheDate = new Date(
      new Date(date).setMinutes(date.getMinutes() + 10)
    );

    const item = {
      key: 'test',
      value: {
        prop1: 1,
        prop2: false,
        prop3: '',
      },
      expiresIn: cacheDate,
    };

    service.setItem(item);
    const receivedItem = service.getItem('non_existent');

    expect(receivedItem).toBeNull();
  });
});
