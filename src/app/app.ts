import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { WeatherResponse, WeatherService } from './weather';
import { Subscription } from 'rxjs';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [DecimalPipe],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit, OnDestroy {
  currentTime = '';
  currentDate = '';
  weather?: WeatherResponse;
  error = '';
  private timerId: any;
  private weatherSub?: Subscription;    

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
      console.log('✅ ngOnInit działa');
    this.updateDateTime();
    this.timerId = setInterval(() => this.updateDateTime(), 1000);

    this.weatherSub = this.weatherService.getWeather('Zabrze').subscribe({
  next: (data: WeatherResponse) => {
    console.log('Dane z API:', data); 
    this.weather = data;
  },
  error: (err) => {
    console.error('Błąd pobierania pogody:', err); 
    this.error = 'Nie udało się pobrać pogody 😞';
  }
});
  }

  ngOnDestroy(): void {
    clearInterval(this.timerId);
    this.weatherSub?.unsubscribe();
  }

  private updateDateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit'});
    this.currentDate = now.toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }

  getWeatherIconUrl(): string {
  if (!this.weather || !this.weather.weather || this.weather.weather.length === 0) {
    return '';
  }
  const icon = this.weather.weather[0].icon;
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}


}
