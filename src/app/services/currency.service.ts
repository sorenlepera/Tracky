import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { CurrencyConverter } from '../interfaces/currencyConverter.interface';
import { CurrencyRepository } from '../repositories/currency.repository';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  public getConvertedCurrency(
    currentCurrency: string,
    convertedCurrency: string,
    amount: number
  ): Observable<CurrencyConverter> {
    return this.currencyRepository
      .getConvertedCurrency(currentCurrency, convertedCurrency, amount)
      .pipe(catchError(this.handleError));
  }

  public handleError(error: string): any {
    console.error(error);
    return new Error(error);
  }
}
