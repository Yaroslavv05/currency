import { Component } from '@angular/core';

interface ConversionData {
  currency: string;
  rate: number;
}

@Component({
  selector: 'app-currency-converter',
  templateUrl: './CurrencyConverterComponent.component.html',
  styleUrls: ['./CurencyConvertComponent.component.css']
})
export class CurrencyConverterComponent {
  input: number = 0;
  result: number = 0;
  select_for: string = '';
  select_to: string = '';
  conversionData: ConversionData[] = [];

  async ngOnInit() {
    this.conversionData = await this.getPrice();
    this.select_for = this.conversionData[0].currency;
    this.select_to = this.conversionData[0].currency;
    this.Convertation();
  }

  async getPrice(): Promise<ConversionData[]> {
    const response = await fetch('https://v6.exchangerate-api.com/v6/67085cf2f1fb79a1eaabea0b/latest/USD');
    const data = await response.json();
    const conversionData: ConversionData[] = [];
    for (const currency in data.conversion_rates) {
      conversionData.push({
        currency: currency,
        rate: data.conversion_rates[currency]
      });
    }
    return conversionData;
  }

  Convertation() {
    const fromCurrency = this.conversionData.find(item => item.currency === this.select_for);
    const toCurrency = this.conversionData.find(item => item.currency === this.select_to);
    if (fromCurrency && toCurrency) {
      this.result = this.input * (toCurrency.rate / fromCurrency.rate);
    } 
    else {
      this.result = 0;
    }
  }

  swapCurrencies() {
    const temp = this.select_for;
    this.select_for = this.select_to;
    this.select_to = temp;
    this.Convertation();
  }
}
