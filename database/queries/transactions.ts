import {
  CreateTransactionDto,
  Transaction,
  UpdateTransactionDto,
} from "@/utils/transactions";
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
      categoryId,
      subCategoryId,
      note,
      gasValue
    ) VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      dto.date,
      dto.count,
      dto.categoryId,
      dto.subCategoryId ?? null,
      dto.note ?? null,
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
      t.id AS transaction_id,
      t.date AS transaction_date,
      t.count AS transaction_count,
      t.note AS transaction_note,
      t.gasValue AS transaction_gasValue,
      t.categoryId AS transaction_categoryId,
      t.subCategoryId AS transaction_subCategoryId,

      c.id AS category_id,
      c.name AS category_name,
      c.color AS category_color,
      c.icon AS category_icon,
      c.type AS category_type,
      c.isArchive AS category_isArchive,
      c.isGas AS category_isGas,
      c.gasType AS category_gasType,
      c.gasPrice AS category_gasPrice,

      s.id        AS sub_id,
      s.name      AS sub_name,
      s.value     AS sub_value
    FROM transactions t
    LEFT JOIN categories c ON c.id = t.categoryId
    LEFT JOIN subcategories s ON s.id = t.subCategoryId
    ORDER BY t.date DESC
  `;

  const rows: TransactionWithCategoryRow[] =
    await db.getAllAsync<TransactionWithCategoryRow>(sql);

  return mapTransactionsWithCategories(rows);
};

export const updateTransaction = async (
  id: number,
  dto: UpdateTransactionDto,
): Promise<void> => {
  const db = await getDb();

  const fields: string[] = [];
  const values: any[] = [];

  if (dto.date !== undefined) {
    fields.push("date = ?");
    values.push(dto.date);
  }
  if (dto.count !== undefined) {
    fields.push("count = ?");
    values.push(dto.count);
  }
  if (dto.note !== undefined) {
    fields.push("note = ?");
    values.push(dto.note);
  }
  if (dto.gasValue !== undefined) {
    fields.push("gasValue = ?");
    values.push(dto.gasValue);
  }

  if (fields.length === 0) return;

  values.push(id);

  const query = `
    UPDATE transactions
    SET ${fields.join(", ")}
    WHERE id = ?
  `;

  await db.runAsync(query, values);
};

export async function deleteTransaction(id: number): Promise<void> {
  const db = await getDb();

  await db.runAsync(`DELETE FROM transactions WHERE id = ?`, [id]);
}

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
      t.subCategoryId AS transaction_subCategoryId,

      c.id        AS category_id,
      c.name      AS category_name,
      c.color     AS category_color,
      c.icon      AS category_icon,
      c.type      AS category_type,
      c.isArchive AS category_isArchive,
      c.isGas     AS category_isGas,
      c.gasType   AS category_gasType,
      c.gasPrice AS category_gasPrice,

      s.id        AS sub_id,
      s.name      AS sub_name,
      s.value     AS sub_value
    FROM transactions t
    INNER JOIN categories c ON c.id = t.categoryId
    LEFT JOIN subcategories s ON s.id = t.subCategoryId
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
      t.subCategoryId AS transaction_subCategoryId,

      c.id        AS category_id,
      c.name      AS category_name,
      c.color     AS category_color,
      c.icon      AS category_icon,
      c.type      AS category_type,
      c.isArchive AS category_isArchive,
      c.isGas     AS category_isGas,
      c.gasType   AS category_gasType,
      c.gasPrice AS category_gasPrice,

      s.id        AS sub_id,
      s.name      AS sub_name,
      s.value     AS sub_value
    FROM transactions t
    INNER JOIN categories c ON c.id = t.categoryId
    LEFT JOIN subcategories s ON s.id = t.subCategoryId
    WHERE t.categoryId = ?
      AND strftime('%m', t.date) = ?
      AND strftime('%Y', t.date) = ?
    ORDER BY t.date DESC

    `,
    [categoryId, monthStr, yearStr],
  );

  return mapTransactionsWithCategories(rows);
};

export const getTransactionsByDateAsync = async ({
  month,
  year,
}: {
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
      t.subCategoryId AS transaction_subCategoryId,

      c.id        AS category_id,
      c.name      AS category_name,
      c.color     AS category_color,
      c.icon      AS category_icon,
      c.type      AS category_type,
      c.isArchive AS category_isArchive,
      c.isGas     AS category_isGas,
      c.gasType   AS category_gasType,
      c.gasPrice AS category_gasPrice,

      s.id        AS sub_id,
      s.name      AS sub_name,
      s.value     AS sub_value
    FROM transactions t
    INNER JOIN categories c ON c.id = t.categoryId
    LEFT JOIN subcategories s ON s.id = t.subCategoryId
    WHERE strftime('%m', t.date) = ?
      AND strftime('%Y', t.date) = ?
    ORDER BY t.date DESC

    `,
    [monthStr, yearStr],
  );

  return mapTransactionsWithCategories(rows);
};
