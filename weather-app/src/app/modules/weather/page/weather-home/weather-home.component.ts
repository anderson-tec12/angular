import { WeatherDatas } from 'src/app/model/interfaces/weatherInterface';
import { WeatherService } from './../../services/weather.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: []
})
export class WeatherHomeComponent implements OnInit, OnDestroy{
  private readonly destroy$: Subject<void> = new Subject()


  searchIcon = faMagnifyingGlass
  initialCityName = 'Diadema'
  weatherData!:WeatherDatas

  constructor(
    private weatherService:WeatherService
  ){}

  getWeatherDatas(cityName:string):void{
    this.weatherService
      .getWeatherDatas(cityName)
      .pipe(
        takeUntil(this.destroy$) // repassando a assinatura
      )
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

  onSubmit():void{
    this.getWeatherDatas(this.initialCityName)
    this.initialCityName = ''
  }

  ngOnInit(): void {
    this.getWeatherDatas(this.initialCityName)
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

  }

}
