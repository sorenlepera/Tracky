export interface CurrencyConverter {
  query: {
    amount: number;
    from: string;
    to: string;
  };
  result: number;
  success: boolean;
}
