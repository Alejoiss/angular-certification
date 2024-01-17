import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConditionsAndZip } from 'app/conditions-and-zip.type';
import { WeatherService } from 'app/services/weather.service';

@Component({
    selector: 'app-conditions-details',
    templateUrl: './conditions-details.component.html',
    styleUrl: './conditions-details.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterLink, DecimalPipe]
})
export class ConditionsDetailsComponent implements OnInit{
    @Input({ required: true }) location: ConditionsAndZip;

    private weatherService = inject(WeatherService);

    icon: string = '';

    ngOnInit(): void {
        // Removed the function called in template to avoid performance issues
        this.icon = this.weatherService.getWeatherIcon(this.location.data.weather[0].id);
    }
}
