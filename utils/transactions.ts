import { Category } from "./categories";

export type CreateTransactionDto = {
  date: string;
  count: number;
  categoryId: number;

  note?: string;
  gasValue?: number;
};

export type Transaction = {
  id: number
  date: string;
  count: number;
  categoryId: number;
  category: Category;

  note?: string;
  gasValue?: number;
};

export type GroupedTransactions = {
  date: string;
  label: string;
  day: string;
  month: string;
  year: string;
  transactions: Transaction[];
};
