import { TestBed } from '@angular/core/testing';

import { OpenWeatherService } from './open-weather.service';

describe('OpenWeatherService', () => {
  let service: OpenWeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenWeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an error if none location is provided', () => {
    let success = false;

    service.getConditionsByLocation('').subscribe((ok) => {
      success = true;
    });

    expect(success).toBe(false);
  });
});
