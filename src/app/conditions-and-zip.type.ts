import { CurrentConditions } from './components/current-conditions/current-conditions.type';

export interface ConditionsAndZip {
    id: number;
    zip: string;
    data: CurrentConditions;
    date: number;
}
