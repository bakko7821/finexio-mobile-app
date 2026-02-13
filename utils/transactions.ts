import { Category, SubCategory } from "./categories";

export type CreateTransactionDto = {
  date: string;
  count: number;
  categoryId: number;

  subCategoryId?: number;
  note?: string;
  gasValue?: number;
};

export type Transaction = {
  id: number
  date: string;
  count: number;
  categoryId: number;
  category: Category;

  subCategoryId?: number;
  subCategory?: SubCategory

  note?: string;
  gasValue?: number;
};

export type GroupedTransactions = {
  date: string;
  label: string;
  day: string;
  month: string;
  year: string;
  groupedCount: number;
  transactions: Transaction[];
};
