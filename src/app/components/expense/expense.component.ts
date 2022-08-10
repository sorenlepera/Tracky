import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Expense } from 'src/app/interfaces/expense.interface';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseFormDialogComponent } from '../expense-form-dialog/expense-form-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { CurrencyService } from 'src/app/services/currency.service';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { CurrencyConverter } from 'src/app/interfaces/currencyConverter.interface';

@Component({
  selector: '[app-expense]',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpenseComponent implements OnInit {
  @Input() public expense!: Expense;
  @Output() deleteExpenseEvent = new EventEmitter<number>();

  public currencyConverted$: Observable<CurrencyConverter> | undefined;
  private readonly destroy$ = new Subject();

  constructor(
    private readonly dialog: MatDialog,
    public readonly currencyService: CurrencyService,
    public readonly translate: TranslateService
  ) {}

  ngOnInit() {
    this.convertCurrency();

    this.translate.onLangChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.convertCurrency();
    });
  }

  public convertCurrency(): void {
    this.currencyConverted$ =
      this.translate.currentLang == 'en'
        ? this.convertToGbp()
        : this.convertToEUR();
  }

  public convertToGbp(): Observable<CurrencyConverter> {
    return this.currencyService.getConvertedCurrency(
      this.expense.originalAmount.currency,
      'GBP',
      this.expense.originalAmount.amount
    );
  }

  public convertToEUR(): Observable<CurrencyConverter> {
    return this.currencyService.getConvertedCurrency(
      this.expense.originalAmount.currency,
      'EUR',
      this.expense.originalAmount.amount
    );
  }

  public editExpense(): void {
    this.dialog.open(ExpenseFormDialogComponent, {
      data: {
        expense: this.expense,
      },
    });
  }

  public deleteExpense(): void {
    // imagine it is a material dialog component
    if (confirm(this.translate.instant('EXPENSE.DELETE-ALERT'))) {
      this.deleteExpenseEvent.emit(this.expense.id);
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next(of());
    this.destroy$.complete();
  }
}
