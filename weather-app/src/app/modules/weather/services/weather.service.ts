import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private API_KEY = "816858f223bc2f93f76046c3525a1308"

  constructor(private http:HttpClient) { }

  getWeatherData(cityName:string):Observable<any>{
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params:{
        q:cityName,
        units:'metric',
        mode:'json',
        appid:this.API_KEY
      }
    })
  }
}
