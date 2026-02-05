import { CreateTransactionDto, Transaction } from "@/utils/types/transactions";
import { getDb } from "./database";

function mapTransaction(row: any): Transaction {
  return {
    id: row.id,
    type: row.type,
    count: row.count,
    note: row.note ?? undefined,
    date: row.date,
    category: {
      id: row.category_id,
      name: row.category_name,
      color: row.category_color,
      icon: row.category_icon,
      type: row.category_type,
    },
  };
}

// POST
export async function createTransaction(
  dto: CreateTransactionDto,
): Promise<Transaction> {
  try {
    const db = await getDb();

    const result = await db.runAsync(
      `
    INSERT INTO transactions (category_id, type, count, note, date)
    VALUES (?, ?, ?, ?, ?)
    `,
      [dto.categoryId, dto.type, dto.count, dto.note ?? null, dto.date],
    );

    const row = await db.getFirstAsync<any>(
      `
  SELECT 
    t.id,
    t.type,
    t.count,
    t.note,
    t.date,
    c.id    AS category_id,
    c.name  AS category_name,
    c.color AS category_color,
    c.icon  AS category_icon,
    c.type  AS category_type
  FROM transactions t
  JOIN categories c ON c.id = t.category_id
  WHERE t.id = ?
  `,
      [result.lastInsertRowId],
    );

    return mapTransaction(row);
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
}

// GET ALL
export async function getAllTransactions(): Promise<Transaction[]> {
  try {
    const db = await getDb();

    const rows = await db.getAllAsync<any>(
      `
    SELECT 
    t.id,
    t.type,
    t.count,
    t.note,
    t.date,
    c.id    AS category_id,
    c.name  AS category_name,
    c.color AS category_color,
    c.icon  AS category_icon,
    c.type  AS category_type
    FROM transactions t
    JOIN categories c ON c.id = t.category_id
    ORDER BY t.date DESC
    `,
    );

    return rows.map(mapTransaction);
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
}

// GET MONTH (1-12)
export async function getTransactionsByMonth(
  month: number,
  year: number,
): Promise<Transaction[]> {
  try {
    const db = await getDb();

    const monthStr = month.toString().padStart(2, "0");

    const rows = await db.getAllAsync<any>(
      `
    SELECT 
      t.id,
      t.type,
      t.count,
      t.note,
      t.date,
      c.id as category_id,
      c.name,
      c.color,
      c.icon,
      c.type
    FROM transactions t
    JOIN categories c ON c.id = t.category_id
    WHERE strftime('%m', datetime(t.date, 'localtime')) = ?
        AND strftime('%Y', datetime(t.date, 'localtime')) = ?
    ORDER BY t.date DESC
    `,
      [monthStr, year.toString()],
    );

    return rows.map(mapTransaction);
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
}

export async function getTransactionsByMonthAndType(
  month: number,
  year: number,
  type: number,
): Promise<Transaction[]> {
  try {
    const db = await getDb();
    const monthStr = month.toString().padStart(2, "0");

    const rows = await db.getAllAsync<any>(
      `
    SELECT
    t.id,
    t.count,
    t.type,
    t.note,
    t.date,
    c.id    AS category_id,
    c.name  AS category_name,
    c.color AS category_color,
    c.icon  AS category_icon,
    c.type  AS category_type
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE strftime('%m', datetime(t.date, 'localtime')) = ?
    AND t.type = ?
    ORDER BY t.date ASC
    `,
      [monthStr, type],
    );

    return rows.map(mapTransaction);
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
}

export async function getTransactionsSumByMonthAndType(
  month: number,
  year: number,
  type: number,
): Promise<number> {
  try {
    const db = await getDb();

    const monthStr = month.toString().padStart(2, "0");

    const row = await db.getFirstAsync<{ total: number }>(
      `
    SELECT 
      COALESCE(SUM(t.count), 0) AS total
    FROM transactions t
    WHERE strftime('%m', datetime(t.date, 'localtime')) = ?
      AND strftime('%Y', datetime(t.date, 'localtime')) = ?
      AND t.type = ?
    `,
      [monthStr, year.toString(), type],
    );

    return row?.total ?? 0;
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
}

// GET TRANSACTIONS BY CATEGORY_ID

export async function getTransactionsByCategoryId(
  categoryId: number,
): Promise<Transaction[]> {
  const db = await getDb();

  const rows = await db.getAllAsync<any>(
    `
    SELECT
      t.id,
      t.type,
      t.count,
      t.note,
      t.date,
      c.id    AS category_id,
      c.name  AS category_name,
      c.color AS category_color,
      c.icon  AS category_icon,
      c.type  AS category_type
    FROM transactions t
    JOIN categories c ON c.id = t.category_id
    WHERE t.category_id = ?
    ORDER BY t.date DESC
    `,
    [categoryId],
  );

  // Преобразуем строки SQLite в объекты Transaction
  return rows.map(mapTransaction);
}
