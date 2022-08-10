import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, Observable, of } from 'rxjs';
import { Expense } from '../interfaces/expense.interface';

@Injectable({
  providedIn: 'root',
})
export class CurrencyRepository {
  private API_ROUTE: string =
    'https://api.apilayer.com/exchangerates_data/convert?';

  private API_KEY: string = '';

  constructor(private readonly http: HttpClient) {}

  public getConvertedCurrency(
    currentCurrency: string,
    convertedCurrency: string,
    amount: number
  ): any {
    const headers = new HttpHeaders({
      apikey: this.API_KEY,
    });

    return this.http.get<any>(
      this.API_ROUTE +
        'from=' +
        `${currentCurrency}` +
        '&to=' +
        `${convertedCurrency}` +
        '&amount=' +
        `${amount}`,
      { headers: headers }
    );
  }
}
