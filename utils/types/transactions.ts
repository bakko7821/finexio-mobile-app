import { Category, SubCategory } from "./categories";
import { Wallet } from "./wallet";

export type CreateTransactionDto = {
  date: string;
  count: number;
  categoryId: number;
  walletId: number;
  subCategoryId?: number;
  note?: string;
  gasValue?: number;
};

export type UpdateTransactionDto = {
  date?: string;
  count?: number;
  note?: string;
  gasValue?: number;
  walletId?: number;
};

export type Transaction = {
  id: number;
  date: string;
  count: number;
  categoryId: number;
  category: Category;
  wallet: Wallet;

  subCategoryId?: number;
  subCategory?: SubCategory;

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
