import { LocalStorageService } from './services/local-storage.service';
import { OpenWeatherService } from './services/open-weather.service';
import { Component, OnInit } from '@angular/core';

import '@deprecat3d/weather-now-component-library';

interface Locale {
  loading: boolean;
  error: boolean;
  temperatureColor?: string;
  temperature?: string;
  humidity?: string;
  pressure?: string;
  lastUpdate?: string;
  city: string;
  country: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public locales: Locale[] = [
    {
      city: 'Nuuk',
      country: 'GL',
      loading: true,
      error: false,
    },
    {
      city: 'Urubici',
      country: 'BR',
      loading: true,
      error: false,
    },
    {
      city: 'Nairobi',
      country: 'KE',
      loading: true,
      error: false,
    },
  ];

  constructor(
    private openWeatherService: OpenWeatherService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.getWeatherConditionsByLocales();
    setInterval(() => this.getWeatherConditionsByLocales(), 600000);
  }

  public onRetryRequest(city: string) {
    const index = this.locales.findIndex((locale) => locale.city === city);
    this.locales[index] = {
      ...this.locales[index],
      ...{ loading: true, error: false },
    };

    this.getWeatherConditionsByLocales();
  }

  private getWeatherConditionsByLocales() {
    this.locales.forEach((locale) => {
      const existsOnCache = this.getFromCache(locale.city);

      if (!existsOnCache) {
        this.openWeatherService.getConditionsByLocation(locale.city).subscribe(
          (response) => {
            this.replaceWeatherConditionSuccess(response, locale.city);
            this.localStorageService.setItem({
              key: locale.city,
              value: response,
              expiresIn: this.defineCacheTime(),
            });
          },
          () => {
            this.requestFailHandler(locale.city);
          }
        );
      } else {
        this.replaceWeatherConditionSuccess(
          existsOnCache.value as OpenWeatherResponse,
          locale.city
        );
      }
    });
  }

  private getFromCache(key: string) {
    return this.localStorageService.getItem(key);
  }

  private replaceWeatherConditionSuccess(
    condition: OpenWeatherResponse,
    city: string
  ) {
    const conditionData = {
      temperature: `${this.defineTemperature(condition.main.temp)}`,
      pressure: `${condition.main.pressure}`,
      humidity: `${condition.main.humidity}`,
      error: false,
      loading: false,
      lastUpdate: `Updated at ${this.defineUpdatedAt(condition.dt)}`,
      temperatureColor: this.defineTemperatureColor(condition.main.temp),
    };

    const index = this.locales.findIndex((locale) => locale.city === city);
    this.locales[index] = { ...this.locales[index], ...conditionData };
  }

  private requestFailHandler(city: string) {
    const index = this.locales.findIndex((locale) => locale.city === city);
    this.locales[index] = {
      ...this.locales[index],
      ...{ loading: false, error: true },
    };
  }

  private defineTemperatureColor(temperature: number): string {
    if (temperature <= 5) {
      return 'blue';
    }

    if (temperature > 5 && temperature <= 25) {
      return 'orange';
    }

    return 'red';
  }

  private defineTemperature(temperature: number): string {
    return temperature.toFixed(1);
  }

  private defineUpdatedAt(timestamp: number): string {
    const multiplyFactor = 1000; // timestamp vem em segundos e o javascript aceita em mili
    return new Date(timestamp * multiplyFactor).toLocaleTimeString('en-US');
  }

  private defineCacheTime(timeInMinutes = 10): Date {
    const date = new Date();
    const cacheDate = new Date(
      new Date(date).setMinutes(date.getMinutes() + timeInMinutes)
    );

    return cacheDate;
  }
}
