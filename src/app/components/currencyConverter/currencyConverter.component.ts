import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

interface ConversionData {
  currency: string;
  rate: number;
}

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currencyConverter.component.html',
  styleUrls: ['./currencyConverter.component.css']
})
export class CurrencyConverterComponent implements OnInit {
  input = 0;
  result = 0;
  select_for = '';
  select_to = ''; 
  conversionData: ConversionData[] = [];

  private updateRatesSubject = new Subject<void>();
  private updateRates$ = this.updateRatesSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.getPrice().subscribe((conversionData) => {
      this.conversionData = conversionData;
      this.select_for = this.conversionData[0].currency;
      this.select_to = this.conversionData[0].currency;
      this.convertation();
    });

    this.updateRates$.pipe(debounceTime(500)).subscribe(() => {
      this.getPrice().subscribe((conversionData) => {
        this.conversionData = conversionData;
        this.convertation();
      });
    });
  }

  // Получение данных о валютах и курсах обмена
  getPrice(): Observable<ConversionData[]> {
    const url = 'https://v6.exchangerate-api.com/v6/67085cf2f1fb79a1eaabea0b/latest/USD';
    return this.httpClient.get(url).pipe(
      map((data: any) => {
        return Object.entries<number>(data.conversion_rates).map(([currency, rate]) => ({
          currency,
          rate
        }));
      })
    );
  }

  // Выполнение конверсии
  convertation() {
    const fromCurrency = this.conversionData.find(item => item.currency === this.select_for);
    const toCurrency = this.conversionData.find(item => item.currency === this.select_to);
    this.result = (fromCurrency && toCurrency) ? this.input * (toCurrency.rate / fromCurrency.rate) : 0;
  }

  // Поменять выбранные валюты местами
  swapCurrencies() {
    [this.select_for, this.select_to] = [this.select_to, this.select_for];
    this.convertation();
  }
}
