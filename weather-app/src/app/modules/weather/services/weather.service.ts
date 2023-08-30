import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private api_key = '816858f223bc2f93f76046c3525a1308'
  constructor(private httpClient: HttpClient) { }

  getWeatherDatas(cityName:string):Observable<any>{
    return this.httpClient.get('https://api.openweathermap.org/data/2.5/weather', {
      params:{
        q:cityName,
        units:'metric',
        mode:'json',
        appid:this.api_key
      }
    })
  }
}
