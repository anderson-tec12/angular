import { Component, Input, OnInit } from '@angular/core';
import { WeatherDatas } from 'src/app/model/interfaces/weatherInterface';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: []
})
export class WeatherCardComponent implements OnInit{
  @Input() weatherDatas!: WeatherDatas

  ngOnInit(): void {
    console.log(`Dados vindo elemento pai - `, this.weatherDatas)
  }
}