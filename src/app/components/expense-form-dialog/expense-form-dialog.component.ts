import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ExpensesService } from 'src/app/services/expenses.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Expense } from 'src/app/interfaces/expense.interface';

@Component({
  selector: 'app-expense-form-dialog',
  templateUrl: './expense-form-dialog.component.html',
  styleUrls: ['./expense-form-dialog.component.css'],
})
export class ExpenseFormDialogComponent implements OnInit {
  public expense!: Expense;
  public expenseForm: FormGroup = this.fb.group({
    purchasedOn: ['', [Validators.required]],
    nature: ['', [Validators.required, Validators.maxLength(120)]],
    comment: ['', [Validators.required, Validators.maxLength(600)]],
    originalAmount: this.fb.group({
      amount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      currency: ['', [Validators.required]],
    }),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { expense: Expense },
    private readonly expensesService: ExpensesService,
    private readonly fb: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.expense = this.data?.expense;
    if (this.expense) {
      this.expenseForm.patchValue(this.expense);
    }
  }

  public onSubmit({ value }: { value: Expense }): void {
    this.expense ? this.editExpense(value) : this.postExpense(value);
  }

  public postExpense(expense: Expense): void {
    this.expensesService.postExpense(expense);
  }

  public editExpense(expense: Expense): void {
    expense.id = this.expense.id;
    this.expensesService.editExpense(expense);
  }
}
