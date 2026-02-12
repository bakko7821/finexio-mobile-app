import { CreateTransactionDto, Transaction } from "@/utils/transactions";
import { getDb } from "..";
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

  const rows = await db.getAllAsync<TransactionRow>(
    `
    SELECT
      t.date,
      t.count,
      t.note,
      t.gasValue,
      t.categoryId,

      c.name  AS category_name,
      c.color AS category_color,
      c.icon  AS category_icon,
      c.type  AS category_type,
      c.isArchive AS category_isArchive,
      c.isGas AS category_isGas,
      c.gasType AS category_gasType,
      c.gasPrice AS category_gasPrice

    FROM transactions t
    INNER JOIN categories c ON c.id = t.categoryId
    WHERE c.isArchive = 0 OR c.isArchive IS NULL
    ORDER BY t.date DESC
    `,
  );

  return rows.map(mapTransactionFromRow);
};
