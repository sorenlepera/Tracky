import { ExpensesService } from './../../services/expenses.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { ExpenseFormDialogComponent } from 'src/app/components/expense-form-dialog/expense-form-dialog.component';
import { Expense } from 'src/app/interfaces/expense.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-expenses-page',
  templateUrl: './expenses-page.component.html',
  styleUrls: ['./expenses-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesPageComponent implements OnInit {
  public expenses$: Observable<Expense[]> | undefined;
  public expenseAmount$: Observable<number> | undefined;

  constructor(
    private readonly expensesService: ExpensesService,
    private readonly dialog: MatDialog,
    public readonly translate: TranslateService
  ) {}

  public ngOnInit(): void {
    this.expenses$ = this.expensesService.expenses$;
    this.expenseAmount$ = this.expensesService.expenseAmount$;
    this.expensesService.fetchExpenses();
  }

  public openDialog(): void {
    this.dialog.open(ExpenseFormDialogComponent);
  }

  public deleteExpense($event: number): void {
    this.expensesService.deleteExpense($event);
  }

  public fetchMoreExpense(): void {
    this.expensesService.fetchMoreExpense();
  }

  public trackById(index: number, _item: Expense): number {
    return index;
  }
}
