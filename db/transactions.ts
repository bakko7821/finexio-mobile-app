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
      name: row.name,
      color: row.color,
      icon: row.icon,
      type: row.category_type,
    },
  };
}

// POST
export async function createTransaction(
  dto: CreateTransactionDto,
): Promise<Transaction> {
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
      c.id as category_id,
      c.name,
      c.color,
      c.icon,
      c.type as category_type
    FROM transactions t
    JOIN categories c ON c.id = t.category_id
    WHERE t.id = ?
    `,
    [result.lastInsertRowId],
  );

  return mapTransaction(row);
}

// GET ALL
export async function getAllTransactions(): Promise<Transaction[]> {
  const db = await getDb();

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
      c.type as category_type
    FROM transactions t
    JOIN categories c ON c.id = t.category_id
    ORDER BY t.date DESC
    `,
  );

  return rows.map(mapTransaction);
}

// GET MONTH (1-12)
export async function getTransactionsByMonth(
  month: number,
  year: number,
): Promise<Transaction[]> {
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
      c.type as category_type
    FROM transactions t
    JOIN categories c ON c.id = t.category_id
    WHERE strftime('%m', t.date) = ?
      AND strftime('%Y', t.date) = ?
    ORDER BY t.date DESC
    `,
    [monthStr, year.toString()],
  );

  return rows.map(mapTransaction);
}
