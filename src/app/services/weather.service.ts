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
  constructor(protected httpClient: HttpClient) {
    this.openWeatherUrl = environment.openWeatherUrl
  }

  public read(city: string): Observable<Weather> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('q', city);
    return this.httpClient.get<Weather>(`${ this.openWeatherUrl}/${Endpoints.Direct}}`, { params: queryParams });
  }

}
