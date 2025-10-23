import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WeatherResponse {
  main: { temp: number };
  weather: { description: string, icon: string }[];
  name: string;
}

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private apiKey = 'd67f57e36e77fbab511c7c22352872cf';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<WeatherResponse> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric&lang=pl`;
    console.log('Wysyłam zapytanie do:', url); // 👈 powinno się pokazać w konsoli
    return this.http.get<WeatherResponse>(url);
  }
}
