import { WeatherDatas } from 'src/app/model/interfaces/weatherInterface';
import { WeatherService } from './../../services/weather.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: []
})
export class WeatherHomeComponent implements OnInit{
  initialCityName = 'Diadema'
  weatherData!:WeatherDatas

  constructor(
    private weatherService:WeatherService
  ){}

  getWeatherDatas(cityName:string):void{
    this.weatherService
      .getWeatherDatas(cityName)
      .subscribe({
        next: (res) => {

          if(res){
            this.weatherData = res

          }

        },
        error: (err) => {
          console.dir(err)
        }
      })
  }

  ngOnInit(): void {
    this.getWeatherDatas(this.initialCityName)
  }

}
