import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherDatas } from 'src/app/models/interfaces/weatherDatas.interface';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: ['./weather-home.component.scss']
})
export class WeatherHomeComponent implements OnInit {
  initialCityName = 'São Paulo'
  weatherDatas!: WeatherDatas

  constructor(private weatherService:WeatherService){}

  getWeatherData(cityName:string):void{
    this.weatherService.getWeatherData(cityName).subscribe({
      next:(response) => {
        response && (this.weatherDatas = response)
        console.log(response)
      },
      error:(err) => {

      }
    })
  }

  ngOnInit(): void {
      this.getWeatherData(this.initialCityName)
  }
}
