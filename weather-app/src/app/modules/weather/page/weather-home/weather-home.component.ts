import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherDatas } from 'src/app/models/interfaces/weatherDatas.interface';
import { Subject, takeUntil } from 'rxjs';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: ['./weather-home.component.scss']
})
export class WeatherHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject()
  initialCityName = 'São Paulo'
  weatherDatas!: WeatherDatas
  searchIcon = faMagnifyingGlass

  constructor(private weatherService:WeatherService){}

  getWeatherData(cityName:string):void{
    this.weatherService.getWeatherData(cityName).pipe(takeUntil(this.destroy$)).subscribe({
      next:(response) => {
        response && (this.weatherDatas = response)
        console.log(response)
      },
      error:(err) => {

      }
    })
  }

  onSubmit(){
    this.getWeatherData(this.initialCityName)
    this.initialCityName = ''
  }

  ngOnInit(): void {
      this.getWeatherData(this.initialCityName)
  }

  ngOnDestroy(): void {
      this.destroy$.next()
      this.destroy$.complete()
  }
}
