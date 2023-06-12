import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Импортируем оператор map

interface ConversionData {
  currency: string;
  rate: number;
}

@Component({
  selector: 'app-currency-converter',
  templateUrl: './CurrencyConverterComponent.component.html',
  styleUrls: ['./CurencyConvertComponent.component.css']
})
export class CurrencyConverterComponent implements OnInit {
  input: number = 0;
  result: number = 0;
  select_for: string = '';
  select_to: string = '';
  conversionData: ConversionData[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.getPrice().subscribe((conversionData) => {
      this.conversionData = conversionData;
      this.select_for = this.conversionData[0].currency; // Устанавливаем первую валюту из списка по умолчанию
      this.select_to = this.conversionData[0].currency; // Устанавливаем первую валюту из списка по умолчанию
      this.convertation(); // Выполняем конвертацию
    });
  }

  getPrice(): Observable<ConversionData[]> {
    const url = 'https://v6.exchangerate-api.com/v6/67085cf2f1fb79a1eaabea0b/latest/USD';
    return this.httpClient.get(url).pipe(
      map((data: any) => {
        const conversionData: ConversionData[] = [];
        for (const currency in data.conversion_rates) {
          conversionData.push({
            currency: currency,
            rate: data.conversion_rates[currency]
          });
        }
        return conversionData;
      })
    );
  }

  convertation() {
    const fromCurrency = this.conversionData.find(item => item.currency === this.select_for); // Находим данные выбранной валюты для конвертации
    const toCurrency = this.conversionData.find(item => item.currency === this.select_to); // Находим данные выбранной валюты для получения результата
    if (fromCurrency && toCurrency) {
      this.result = this.input * (toCurrency.rate / fromCurrency.rate); // Выполняем конвертацию
    } else {
      this.result = 0;
    }
  }

  swapCurrencies() {
    const temp = this.select_for;
    this.select_for = this.select_to;
    this.select_to = temp;
    this.convertation();
  }
}
