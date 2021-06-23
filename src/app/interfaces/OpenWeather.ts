import { Observable } from 'rxjs';

export interface OpenWeather {
  getConditionsByLocation(location: string): Observable<OpenWeatherResponse>;
}
