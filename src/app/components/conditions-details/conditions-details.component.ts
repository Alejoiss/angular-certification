import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { WeatherService } from 'app/weather.service';

@Component({
    selector: 'app-conditions-details',
    templateUrl: './conditions-details.component.html',
    styleUrl: './conditions-details.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConditionsDetailsComponent implements OnInit{
    @Input({ required: true }) location: any;

    private weatherService = inject(WeatherService);

    icon: string = '';

    ngOnInit(): void {
        this.icon = this.weatherService.getWeatherIcon(this.location.data.weather[0].id);
    }
}
