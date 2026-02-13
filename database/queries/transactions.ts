import { CreateTransactionDto, Transaction } from "@/utils/transactions";
import { getDb } from "../db";
import {
  mapTransactionsWithCategories,
  TransactionWithCategoryRow,
} from "../mappers/transaction.mapper";

export const createTransaction = async (
  dto: CreateTransactionDto,
): Promise<number> => {
  const db = await getDb();

  const result = await db.runAsync(
    `
    INSERT INTO transactions (
      date,
      count,
      note,
      categoryId,
      gasValue
    )
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      dto.date,
      dto.count,
      dto.note ?? null,
      dto.categoryId,
      dto.gasValue ?? null,
    ],
  );

  return result.lastInsertRowId;
};

export const getTransactions = async (): Promise<Transaction[]> => {
  const db = await getDb();
  if (!db) return [];

  const sql = `
    SELECT
      t.id        AS transaction_id,
      t.date      AS transaction_date,
      t.count     AS transaction_count,
      t.note      AS transaction_note,
      t.gasValue  AS transaction_gasValue,
      t.categoryId AS transaction_categoryId,

      c.id        AS category_id,
      c.name      AS category_name,
      c.color     AS category_color,
      c.icon      AS category_icon,
      c.type      AS category_type,
      c.isArchive AS category_isArchive,
      c.isGas     AS category_isGas,
      c.gasType   AS category_gasType,
      c.gasPrice AS category_gasPrice,

      NULL AS sub_id,
      NULL AS sub_name,
      NULL AS sub_value
    FROM transactions t
    LEFT JOIN categories c ON c.id = t.categoryId
    ORDER BY t.date DESC
`;

  const rows: TransactionWithCategoryRow[] =
    await db.getAllAsync<TransactionWithCategoryRow>(sql);

  return mapTransactionsWithCategories(rows);
};

export const getAllTransactionsByCategory = async ({
  categoryId,
}: {
  categoryId: number;
}): Promise<Transaction[]> => {
  const db = await getDb();
  if (!db) return [];

  const rows = await db.getAllAsync<TransactionWithCategoryRow>(
    `
    SELECT
      t.id        AS transaction_id,
      t.date      AS transaction_date,
      t.count     AS transaction_count,
      t.note      AS transaction_note,
      t.gasValue  AS transaction_gasValue,
      t.categoryId AS transaction_categoryId,

      c.id        AS category_id,
      c.name      AS category_name,
      c.color     AS category_color,
      c.icon      AS category_icon,
      c.type      AS category_type,
      c.isArchive AS category_isArchive,
      c.isGas     AS category_isGas,
      c.gasType   AS category_gasType,
      c.gasPrice AS category_gasPrice,

      NULL AS sub_id,
      NULL AS sub_name,
      NULL AS sub_value
    FROM transactions t
    INNER JOIN categories c ON c.id = t.categoryId
    WHERE t.categoryId = ?
    ORDER BY t.date DESC
    `,
    [categoryId],
  );

  return mapTransactionsWithCategories(rows);
};

export const getTransactionsByCategoryAndDateAsync = async ({
  categoryId,
  month,
  year,
}: {
  categoryId: number;
  month: number;
  year: number;
}): Promise<Transaction[]> => {
  const db = await getDb();
  if (!db) return [];

  const monthStr = month.toString().padStart(2, "0");
  const yearStr = year.toString();

  const rows = await db.getAllAsync<TransactionWithCategoryRow>(
    `
    SELECT
      t.id        AS transaction_id,
      t.date      AS transaction_date,
      t.count     AS transaction_count,
      t.note      AS transaction_note,
      t.gasValue  AS transaction_gasValue,
      t.categoryId AS transaction_categoryId,

      c.id        AS category_id,
      c.name      AS category_name,
      c.color     AS category_color,
      c.icon      AS category_icon,
      c.type      AS category_type,
      c.isArchive AS category_isArchive,
      c.isGas     AS category_isGas,
      c.gasType   AS category_gasType,
      c.gasPrice AS category_gasPrice,

      NULL AS sub_id,
      NULL AS sub_name,
      NULL AS sub_value
    FROM transactions t
    INNER JOIN categories c ON c.id = t.categoryId
    WHERE t.categoryId = ?
      AND strftime('%m', t.date) = ?
      AND strftime('%Y', t.date) = ?
    ORDER BY t.date DESC

    `,
    [categoryId, monthStr, yearStr],
  );

  return mapTransactionsWithCategories(rows);
};
