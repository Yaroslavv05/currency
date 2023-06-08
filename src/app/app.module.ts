import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ExchangeRateComponent} from './components/ExchangeRateComponent/ExchangeRateComponent.component'
import {CurrencyConverterComponent} from './components/CurrencyConverterComponent/CurrencyConverterComponent.component'

@NgModule({
  declarations: [
    AppComponent,
    ExchangeRateComponent,
    CurrencyConverterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
