import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ExchangeRate {
  currency: string;
  rate: number;
}

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './ExchangeRateComponent.component.html',
  styleUrls: ['./ExchangeRateComponent.component.css']
})
export class ExchangeRateComponent implements OnInit {
  exchangeRates: ExchangeRate[] = []; // Массив для хранения обменных курсов

  currencies = ['USD', 'EUR', 'GBP']; // Сюда можно вписать любую валюту и она появится в 

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.getExchangeRates();
  }

  getExchangeRates() {
    this.currencies.forEach(currency => {
      this.getExchangeRate(currency).subscribe((data: any) => {
        const rate = data.conversion_rates.UAH.toFixed(2); // Извлекаем обменный курс для UAH из данных ответа и форматируем его до 2 десятичных знаков
        this.exchangeRates.push({ currency, rate });  // Добавляем валюту и соответствующий ей обменный курс в массив 'exchangeRates'
      });
    });
  }

  getExchangeRate(currency: string) {
    const url = `https://v6.exchangerate-api.com/v6/67085cf2f1fb79a1eaabea0b/latest/${currency}`;
    return this.httpClient.get(url);
  }
}
