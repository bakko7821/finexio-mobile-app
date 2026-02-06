import { CreateTransactionDto, Transaction } from "@/utils/types/transactions";
import { getDb } from "./database";

function mapTransaction(row: any): Transaction {
  return {
    id: row.id,
    type: row.type,
    count: row.count,
    note: row.note ?? undefined,
    date: row.date,
    gasValue: row.gas_value ?? undefined, // это конкретная заправка
    category: {
      id: row.category_id,
      name: row.category_name,
      color: row.category_color,
      icon: row.category_icon,
      type: row.category_type,
      isGas: !!row.is_gas,
      gasSettings: row.is_gas
        ? {
            gasType: row.gas_type,
            gasValue: row.category_gas_value,
          }
        : undefined,
    },
  };
}

// POST
export async function createTransaction(
  dto: CreateTransactionDto,
): Promise<Transaction> {
  const db = await getDb();

  // Берём категорию с её gasSettings
  const categoryRow = await db.getFirstAsync<any>(
    `SELECT c.*, gs.gas_type, gs.gas_value
     FROM categories c
     LEFT JOIN category_gas_settings gs ON gs.category_id = c.id
     WHERE c.id = ?`,
    [dto.categoryId],
  );

  if (!categoryRow) throw new Error("Категория не найдена");

  const isGas = !!categoryRow.is_gas;

  // gasValue для этой транзакции
  const transactionGasValue = isGas ? (dto.gasValue ?? 0) : null;

  // 1️⃣ создаём транзакцию
  const result = await db.runAsync(
    `INSERT INTO transactions (category_id, type, count, note, date, gas_value)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      dto.categoryId,
      dto.type,
      dto.count,
      dto.note ?? null,
      dto.date,
      transactionGasValue,
    ],
  );

  // 2️⃣ обновляем общий gasValue в category_gas_settings
  if (isGas && transactionGasValue) {
    await db.runAsync(
      `UPDATE category_gas_settings
       SET gas_value = gas_value + ?
       WHERE category_id = ?`,
      [transactionGasValue, dto.categoryId],
    );
  }

  // 3️⃣ подтягиваем транзакцию с JOIN по категории и gasSettings
  const row = await db.getFirstAsync<any>(
    `SELECT 
      t.id,
      t.type,
      t.count,
      t.note,
      t.date,
      t.gas_value,
      c.id AS category_id,
      c.name AS category_name,
      c.color AS category_color,
      c.icon AS category_icon,
      c.type AS category_type,
      c.is_gas,
      gs.gas_type,
      gs.gas_value AS category_gas_value
     FROM transactions t
     JOIN categories c ON c.id = t.category_id
     LEFT JOIN category_gas_settings gs ON gs.category_id = c.id
     WHERE t.id = ?`,
    [result.lastInsertRowId],
  );

  console.log(mapTransaction(row));
  return mapTransaction(row);
}

// GET ALL
export async function getAllTransactions(): Promise<Transaction[]> {
  try {
    const db = await getDb();

    const rows = await db.getAllAsync<any>(
      `SELECT 
      t.id,
      t.type,
      t.count,
      t.note,
      t.date,
      t.gas_value,
      c.id AS category_id,
      c.name AS category_name,
      c.color AS category_color,
      c.icon AS category_icon,
      c.type AS category_type,
      c.is_gas,
      gs.gas_type,
      gs.gas_value AS category_gas_value
     FROM transactions t
     JOIN categories c ON c.id = t.category_id
     LEFT JOIN category_gas_settings gs ON gs.category_id = c.id
     ORDER BY t.date DESC`,
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
      `SELECT 
      t.id,
      t.type,
      t.count,
      t.note,
      t.date,
      t.gas_value,
      c.id AS category_id,
      c.name AS category_name,
      c.color AS category_color,
      c.icon AS category_icon,
      c.type AS category_type,
      c.is_gas,
      gs.gas_type,
      gs.gas_value AS category_gas_value
     FROM transactions t
     JOIN categories c ON t.category_id = c.id
     LEFT JOIN category_gas_settings gs ON gs.category_id = c.id
     WHERE strftime('%m', datetime(t.date, 'localtime')) = ?
       AND strftime('%Y', datetime(t.date, 'localtime')) = ?
     ORDER BY t.date DESC`,
      [monthStr, year.toString()],
    );

    return rows.map(mapTransaction);
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
}

// GET TRANSACTIONS BY CATEGORY_ID

export async function getTransactionsByCategoryId(
  categoryId: number,
): Promise<Transaction[]> {
  try {
    const db = await getDb();

    const rows = await db.getAllAsync<any>(
      `SELECT
      t.id,
      t.type,
      t.count,
      t.note,
      t.date,
      t.gas_value,
      c.id AS category_id,
      c.name AS category_name,
      c.color AS category_color,
      c.icon AS category_icon,
      c.type AS category_type,
      c.is_gas,
      gs.gas_type,
      gs.gas_value AS category_gas_value
     FROM transactions t
     JOIN categories c ON c.id = t.category_id
     LEFT JOIN category_gas_settings gs ON gs.category_id = c.id
     WHERE t.category_id = ?
     ORDER BY t.date DESC`,
      [categoryId],
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
      `SELECT
      t.id,
      t.type,
      t.count,
      t.note,
      t.date,
      t.gas_value,
      c.id AS category_id,
      c.name AS category_name,
      c.color AS category_color,
      c.icon AS category_icon,
      c.type AS category_type,
      c.is_gas,
      gs.gas_type,
      gs.gas_value AS category_gas_value
     FROM transactions t
     JOIN categories c ON t.category_id = c.id
     LEFT JOIN category_gas_settings gs ON gs.category_id = c.id
     WHERE strftime('%m', datetime(t.date, 'localtime')) = ?
       AND t.type = ?
     ORDER BY t.date ASC`,
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

export async function deleteTransaction(transactionId: number): Promise<void> {
  try {
    const db = await getDb();

    // Получаем транзакцию с info о категории и gasValue
    const tx = await db.getFirstAsync<any>(
      `SELECT 
       t.id,
       t.gas_value,
       c.id AS category_id,
       c.is_gas
     FROM transactions t
     JOIN categories c ON c.id = t.category_id
     WHERE t.id = ?`,
      [transactionId],
    );

    if (!tx) throw new Error("Транзакция не найдена");

    // Если категория топливная и есть gas_value в транзакции
    if (tx.is_gas && tx.gas_value != null) {
      await db.runAsync(
        `UPDATE category_gas_settings
       SET gas_value = gas_value - ?
       WHERE category_id = ?`,
        [tx.gas_value, tx.category_id],
      );
    }

    // Удаляем транзакцию
    await db.runAsync(`DELETE FROM transactions WHERE id = ?`, [transactionId]);
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
}
