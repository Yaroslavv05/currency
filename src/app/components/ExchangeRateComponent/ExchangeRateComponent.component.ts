import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './ExchangeRateComponent.component.html',
  styleUrls: ['./ExchangeRateComponent.component.css']
})
export class ExchangeRateComponent implements OnInit {
  resultUSD: number = 0;
  resultEUR: number = 0;

  ngOnInit() {
    this.getExchangeRates();
  }

  async getExchangeRates() {
    //USD
    const response_USD = await fetch('https://v6.exchangerate-api.com/v6/67085cf2f1fb79a1eaabea0b/latest/USD');
    const data_USD = await response_USD.json();
    const result_USD = await data_USD.conversion_rates.UAH;
    this.resultUSD = result_USD.toFixed(2);
    //EUR
    const response_EUR = await fetch('https://v6.exchangerate-api.com/v6/67085cf2f1fb79a1eaabea0b/latest/EUR');
    const data_EUR = await response_EUR.json();
    const result_EUR = await data_EUR.conversion_rates.UAH;
    this.resultEUR = result_EUR.toFixed(2);
  }
}
