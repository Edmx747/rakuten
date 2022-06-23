import { Endpoints } from '../helpers/enum/endpoints';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Weather } from '../models/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private openWeatherUrl: string;
  private openWeatherKey: string;
  constructor(protected httpClient: HttpClient) {
    this.openWeatherUrl = environment.openWeatherUrl;
    this.openWeatherKey = environment.openWeatherKey;
  }

  public getWeatherByCity(city: string, units = 'metric'): Observable<Weather> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('q', city);
    queryParams = queryParams.append('appid', this.openWeatherKey);
    queryParams = queryParams.append('units', units);
    return this.httpClient.get<Weather>(`${this.openWeatherUrl}/${Endpoints.Weather}`, { params: queryParams });
  }

}
