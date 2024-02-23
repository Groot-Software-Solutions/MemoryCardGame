import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MemoryCardGameService } from './Services/memory-card-game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public forecasts?: WeatherForecast[];

  constructor(http: HttpClient,
    private memoryGameService: MemoryCardGameService) {
    http.get<WeatherForecast[]>('/weatherforecast').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }

  ngOnInit(): void {
    this.memoryGameService.initiateSignalrConnection();
  }

  title = 'angularapp';
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
