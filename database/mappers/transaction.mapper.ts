import { Transaction } from "@/utils/types/transactions";
import { CategoryWithSubRow, mapCategoriesWithSubs } from "./category.mapper";

export type TransactionWithCategoryRow = CategoryWithSubRow & {
  transaction_id: number;
  transaction_date: string;
  transaction_count: number;
  transaction_categoryId: number;
  transaction_subCategoryId?: number;

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
        (r) => r.transaction_id === row.transaction_id,
      );

      const [category] = mapCategoriesWithSubs(transactionRows);

      const subCategory = transactionRows.find(
        (r) => r.sub_id === row.transaction_subCategoryId,
      );

      map.set(row.transaction_id, {
        id: row.transaction_id,
        date: row.transaction_date,
        count: row.transaction_count,
        categoryId: row.transaction_categoryId,
        category,

        subCategoryId: row.transaction_subCategoryId ?? undefined,
        subCategory: subCategory
          ? {
              id: subCategory.sub_id!,
              name: subCategory.sub_name!,
              value: subCategory.sub_value ?? 0,
            }
          : undefined,

        note: row.transaction_note ?? undefined,
        gasValue: row.transaction_gasValue ?? undefined,
      });
    }
  }

  return Array.from(map.values());
};
