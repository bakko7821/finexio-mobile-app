import { CreateTransactionDto, Transaction } from "@/utils/transactions";
import { getDb } from "../db";
import {
    mapTransactionFromRow,
    TransactionRow,
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
      t.id AS id,
      t.date AS date,
      t.count AS count,
      t.note AS note,
      t.gasValue AS gasValue,
      t.categoryId AS categoryId,
      
      c.id AS category_id,
      c.name AS category_name,
      c.color AS category_color,
      c.icon AS category_icon,
      c.type AS category_type,
      c.isArchive AS category_isArchive,
      c.isGas AS category_isGas,
      c.gasType AS category_gasType,
      c.gasPrice AS category_gasPrice

    FROM transactions t
    LEFT JOIN categories c ON c.id = t.categoryId
    ORDER BY t.date DESC
  `;

  const rows: TransactionRow[] = await db.getAllAsync<TransactionRow>(sql);

  return rows.map(mapTransactionFromRow);
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

  const rows = await db.getAllAsync<TransactionRow>(
    `
    SELECT
      t.id AS id,
      t.date AS date,
      t.count AS count,
      t.note AS note,
      t.gasValue AS gasValue,
      t.categoryId AS categoryId,

      c.id AS category_id,
      c.name AS category_name,
      c.color AS category_color,
      c.icon AS category_icon,
      c.type AS category_type,
      c.isArchive AS category_isArchive,
      c.isGas AS category_isGas,
      c.gasType AS category_gasType,
      c.gasPrice AS category_gasPrice
    FROM transactions t
    INNER JOIN categories c ON c.id = t.categoryId
    WHERE t.categoryId = ? AND strftime('%m', t.date) = ? AND strftime('%Y', t.date) = ?
    ORDER BY t.date DESC
    `,
    [categoryId, monthStr, yearStr],
  );

  return rows.map(mapTransactionFromRow);
};
