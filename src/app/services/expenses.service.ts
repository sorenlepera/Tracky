import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, BehaviorSubject, tap, catchError } from 'rxjs';
import { Expense } from '../interfaces/expense.interface';
import { ExpensesRepository } from '../repositories/expenses.repository';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  public expenseSubject = new BehaviorSubject<Expense[]>([]);
  public expenses$ = this.expenseSubject.asObservable();

  public expenseAmountSubject = new BehaviorSubject<number>(0);
  public expenseAmount$ = this.expenseAmountSubject.asObservable();

  public pagination = 1;

  constructor(private readonly expensesRepository: ExpensesRepository) {}

  public fetchExpenses(): void {
    this.pagination = 1;

    this.expensesRepository
      .getExpenses(this.pagination)
      .pipe(
        take(1),
        tap((response: HttpResponse<Expense[]>) => {
          const expenseAmount = response.headers.get('X-Total-Count');

          if (expenseAmount) {
            this.expenseAmountSubject.next(~~expenseAmount);
          }
          if (response.body) {
            this.expenseSubject.next(response.body);
          }
        }),
        catchError(this.handleError)
      )
      .subscribe();
  }

  public fetchMoreExpense(): void {
    this.pagination = this.pagination + 1;

    this.expensesRepository
      .getExpenses(this.pagination)
      .pipe(
        take(1),
        tap((response: HttpResponse<Expense[]>) => {
          if (response.body) {
            this.expenseSubject.next([
              ...this.expenseSubject.getValue(),
              ...response.body,
            ]);
          }
        }),
        catchError(this.handleError)
      )
      .subscribe();
  }

  public postExpense(expense: Expense): void {
    this.expensesRepository
      .postExpense(expense)
      .pipe(
        take(1),
        tap(() => {
          // this.expenseAmountSubject.next(this.expenseAmountSubject.value + 1);
          // this.expenseSubject.next([...this.expenseSubject.value, expense]);

          this.fetchExpenses();
        }),
        catchError(this.handleError)
      )
      .subscribe();
  }

  public editExpense(editedExpense: Expense): void {
    this.expensesRepository
      .editExpense(editedExpense)
      .pipe(
        take(1),
        tap(() => {
          const editedExpenses = this.expenseSubject.value.map((item) =>
            item.id === editedExpense.id ? editedExpense : item
          );

          this.expenseSubject.next(editedExpenses);
        }),
        catchError(this.handleError)
      )
      .subscribe();
  }

  public deleteExpense(id: number): void {
    this.expensesRepository
      .deleteExpense(id)
      .pipe(
        take(1),
        tap(() => {
          // const filteredExpenses = this.expenseSubject.value.filter(
          //   (expense: Expense) => expense.id != id
          // );
          // const filteredAmount = ~~this.expenseAmountSubject.value - 1;
          // this.expenseSubject.next(filteredExpenses);
          // this.expenseAmountSubject.next(filteredAmount);

          this.fetchExpenses();
        }),
        catchError(this.handleError)
      )
      .subscribe();
  }

  public handleError(error: string): any {
    console.error(error);
    return new Error(error);
  }
}
