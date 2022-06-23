import { Setting } from './../../models/setting';
import { SettingsComponent } from './../settings/settings.component';
import { MatSelectionListChange } from '@angular/material/list';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { cities } from 'src/app/helpers/datas/city';
import { defaultCities } from 'src/app/helpers/datas/default-cities';
import { SessionStorage } from 'src/app/helpers/enum/sessionStorageKey';
import { CitiesHistory } from 'src/app/models/citiesHistory';
import { Weather } from 'src/app/models/weather';
import { WeatherService } from 'src/app/services/weather.service';
import { MatDialog } from '@angular/material/dialog';
moment.locale('en-gb');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  control = new FormControl('');
  options: string[] = cities;
  filteredOptions$: Observable<string[]> = this.filteredOptionsObservable();
  citiesHistory: CitiesHistory[] = [];
  cities: Weather[] = [];
  selectedCities: string[] = [];
  today: string;
  settings: Setting = {
    maxHistory: 5,
    details: false
  }
  constructor(private weatherService: WeatherService, public dialog: MatDialog) { }

  ngOnInit(): void {
    setInterval(() => {
      this.today = moment().format('LL LTS');
    }, 1000);
  }

  ngAfterViewInit(): void {
    this.load()
  }

  load(): void {
    this.initCitiesFromHistory();
    this.initSelectedCities();
  }

  filteredOptionsObservable(): Observable<string[]> {
    return this.filteredOptions$ = this.control.valueChanges.pipe(
      startWith(''),
      map((value: any) => (value.length > 2 ? this.filter(value || '') : []))
    );
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private initCitiesFromHistory(): void {
    const history = sessionStorage.getItem(SessionStorage.History);
    if (history) {
      this.citiesHistory = JSON.parse(history);
    } else {
      sessionStorage.setItem(SessionStorage.History, JSON.stringify(defaultCities));
      this.citiesHistory = defaultCities;
    }
  }

  private initSelectedCities(): void {
    if (this.citiesHistory.length > 0) {
      this.citiesHistory.forEach(city => {
        console.log('city:', city)
        if (city.selected) {
          this.getWeather(city.name, true);
        }
      })
    }
  }

  getWeather(city: string, isHistory: boolean = false): void {
    this.weatherService.getWeatherByCity(city).subscribe((res: Weather) => {
      console.log('res:', res)
      this.control.setValue('');
      if (!this.selectedCities.includes(res.name) && this.citiesHistory.find(city => city.name !== res.name)) {
        this.cities.push(res);
      }
      if (!isHistory) {
        this.citiesHistory.push({
          name: res.name,
          selected: true
        });
        sessionStorage.setItem(SessionStorage.History, JSON.stringify(this.citiesHistory));
      }
    });
  }

  onSelectionChange(event: MatSelectionListChange): void {
    if (event.options[0].selected) {
      this.getWeather(event.options[0].value, true)
    } else {
      this.cities = this.cities.filter(city => city.name !== event.options[0].value)
    }
  }

  openSettings(): void {
    const dialogRef = this.dialog.open(SettingsComponent, {
      data: {
        setting: this.settings
      }
    });
    dialogRef.afterClosed().subscribe((result: Setting) => {
      if (result) {
        this.settings.maxHistory = this.settings.maxHistory;
        this.settings.details = this.settings.details;
        this.load()
      }
    });
  }
}
