import { Forecast } from 'app/components/forecasts-list/forecast.type';
import { ConditionsAndZip } from 'app/conditions-and-zip.type';

export interface DataStorage {
    date: number;
    active: boolean;
    data: ConditionsAndZip | Forecast;
    zip: string;
}
