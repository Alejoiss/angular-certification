import { Injectable } from '@angular/core';
import { DataStorage } from 'app/data-storage';

const DEFAULT_TIME_EXPIRATION = 1000 * 60 * 60 * 2; // 2 hours

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    getDataFromJson(key: 'current' | 'forecast'): any {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }

    setDataFromObject(key: string, data: any): void {
        window.localStorage.setItem(key, JSON.stringify(data));
    }

    removeData(key: string): void {
        window.localStorage.removeItem(key);
    }

    setActiveData(type: 'current' | 'forecast'): void {
        const dataFromStorage = this.getDataFromJson(type);

        const validData = dataFromStorage.map((d: DataStorage) => {
            d.active = this.validateTimeExpiration(d);
            return d;
        });

        this.setDataFromObject(type, validData);
    }

    clearInactivatedData(type: 'current' | 'forecast'): void {
        const dataFromStorage = this.getDataFromJson(type);

        const validData = dataFromStorage.filter((d: DataStorage) => d.active);

        this.setDataFromObject(type, validData);
    }

    createDataStorage(data: any, zip: string, type: 'current' | 'forecast'): void {
        const register: DataStorage = {
            date: new Date().getTime(),
            data,
            zip,
            active: true
        };

        this.replaceData(type, register);
    }

    removeDataStorageByZip(zip: string, type: 'current' | 'forecast'): void {
        const dataFromStorage = this.getDataFromJson(type);

        const validData = dataFromStorage.filter((d: DataStorage) => d.zip !== zip);

        this.setDataFromObject(type, validData);
    }

    replaceData(key: 'current' | 'forecast', register: DataStorage): void {
        this.setActiveData(key);
        const currents = this.getDataFromJson(key);
        currents.push(register);
        this.setDataFromObject(key, currents);
    }

    private validateTimeExpiration(data: DataStorage): boolean {
        const date = new Date(data.date);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        return diff < DEFAULT_TIME_EXPIRATION;
    }
}
