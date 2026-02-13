import { Transaction } from "@/utils/transactions";
import { CategoryWithSubRow, mapCategoriesWithSubs } from "./category.mapper";

export type TransactionWithCategoryRow = CategoryWithSubRow & {
  transaction_id: number;
  transaction_date: string;
  transaction_count: number;
  transaction_categoryId: number;

  transaction_note?: string | null;
  transaction_gasValue?: number | null;
};

export const mapTransactionsWithCategories = (
  rows: TransactionWithCategoryRow[],
): Transaction[] => {
  const map = new Map<number, Transaction>();

  for (const row of rows) {
    if (!map.has(row.transaction_id)) {
      // берём ВСЕ строки этой транзакции
      const transactionRows = rows.filter(
        r => r.transaction_id === row.transaction_id,
      );

      const [category] = mapCategoriesWithSubs(transactionRows);

      map.set(row.transaction_id, {
        id: row.transaction_id,
        date: row.transaction_date,
        count: row.transaction_count,
        categoryId: row.transaction_categoryId,

        note: row.transaction_note ?? undefined,
        gasValue: row.transaction_gasValue ?? undefined,

        category,
      });
    }
  }

  return Array.from(map.values());
};
