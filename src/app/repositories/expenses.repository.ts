import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from '../interfaces/expense.interface';

@Injectable({
  providedIn: 'root',
})
export class ExpensesRepository {
  private API_ROUTE: string = 'http://localhost:3000/api/expenseItems';

  constructor(private readonly http: HttpClient) {}

  public getExpenses(pagination: number): Observable<HttpResponse<Expense[]>> {
    return this.http.get<Expense[]>(
      this.API_ROUTE + '?_page=' + `${pagination}` + '&_limit=5',
      { observe: 'response' }
    );
  }

  public postExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.API_ROUTE, expense);
  }

  public editExpense(expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(this.API_ROUTE + '/' + expense.id, expense);
  }

  public deleteExpense(id: number): Observable<Object> {
    return this.http.delete(this.API_ROUTE + '/' + id);
  }
}
