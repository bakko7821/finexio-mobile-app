import { Transaction } from "@/utils/transactions";
import { CategoryRow, mapCategoryFromRow } from "./category.mapper";

export type TransactionRow = CategoryRow & {
  id: number;
  date: string;
  count: number;
  categoryId: number;
  note?: string | null;
  gasValue?: number | null;
};

export const mapTransactionFromRow = (row: TransactionRow): Transaction => ({
  id: row.id,
  date: row.date,
  count: row.count,
  categoryId: row.categoryId,

  note: row.note ?? undefined,
  gasValue: row.gasValue ?? undefined,

  category: mapCategoryFromRow(row),
});
