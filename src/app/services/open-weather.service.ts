import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { OpenWeather } from '../interfaces/OpenWeather';

@Injectable({
  providedIn: 'root',
})
export class OpenWeatherService implements OpenWeather {
  constructor(private http: HttpClient) {}

  getConditionsByLocation(location: string): Observable<OpenWeatherResponse> {
    return this.http.get<OpenWeatherResponse>(this.requestBuilder(location));
  }

  private requestBuilder(location: string): string {
    return `${environment.OPEN_WEATHER_API_BASE_URL}?q=${location}&appid=${environment.OPEN_WEATHER_API_KEY}&units=metric`;
  }
}
