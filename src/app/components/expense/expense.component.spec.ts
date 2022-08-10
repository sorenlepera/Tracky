/* tslint:disable:no-unused-variable */
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ExpenseComponent } from './expense.component';

describe('ExpenseComponent', () => {
  let component: ExpenseComponent;
  let fixture: ComponentFixture<ExpenseComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        FormsModule,
        MatDialogModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
      ],
      declarations: [ExpenseComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseComponent);
    component = fixture.componentInstance;
    component.expense = {
      purchasedOn: '2018-12-04',
      nature: 'Hotel',
      comment: 'Good bedroom',
      originalAmount: {
        amount: 12,
        currency: 'eur',
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
