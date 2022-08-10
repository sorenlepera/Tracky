export interface Expense {
  id?: number;
  purchasedOn: string;
  nature: string;
  comment?: string;
  originalAmount: {
    amount: number;
    currency: string;
  };
}
