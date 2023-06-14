import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

interface ExchangeRate {
  currency: string;
  rate: number;
}

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchangeRate.component.html',
  styleUrls: ['./exchangeRate.component.css']
})
export class ExchangeRateComponent implements OnInit {
  exchangeRates: ExchangeRate[] = [];  // Массив для хранения обменных курсов
  
  currencies = ['USD', 'EUR', 'GBP']; // Сюда можно вписать любую валюту и она появится в 

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.getExchangeRates();
  }

  // Получение курсов обмена для заданных валют
  getExchangeRates() {
    const requests = this.currencies.map(currency => this.getExchangeRate(currency));
    forkJoin(requests).subscribe((results: any[]) => {
      this.exchangeRates = results.map((data: any, index) => ({
        currency: this.currencies[index],
        rate: data.conversion_rates.UAH.toFixed(2)
      }));
    });
  }

  // Получение курса обмена для заданной валюты
  getExchangeRate(currency: string) {
    const url = `https://v6.exchangerate-api.com/v6/67085cf2f1fb79a1eaabea0b/latest/${currency}`;
    return this.httpClient.get(url);
  }
}
