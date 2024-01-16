import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { WeatherService } from 'app/services/weather.service';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-conditions-details',
    templateUrl: './conditions-details.component.html',
    styleUrl: './conditions-details.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterLink, DecimalPipe]
})
export class ConditionsDetailsComponent implements OnInit{
    @Input({ required: true }) location: any;

    private weatherService = inject(WeatherService);

    icon: string = '';

    ngOnInit(): void {
        // Removed the function called in template to avoid performance issues
        this.icon = this.weatherService.getWeatherIcon(this.location.data.weather[0].id);
    }
}
