import { TestBed } from '@angular/core/testing';
import { ExpensesPageComponent } from './expenses-page.component';

describe('ExpensePageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpensesPageComponent],
    }).compileComponents();
  });

  it('should create the ExpensePage', () => {
    const fixture = TestBed.createComponent(ExpensesPageComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
