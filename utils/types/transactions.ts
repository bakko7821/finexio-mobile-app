import { Category } from "./categories";

export interface Transaction {
  id: number;
  type: number;
  count: number;
  note?: string;
  date: string; // ISO
  category: Category;
}

export interface CreateTransactionDto {
  categoryId: number;
  type: number;
  count: number;
  note?: string;
  date: string; // ISO
}
