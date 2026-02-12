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

type GetTransactionsParams = {
  categoryId?: number;
  month?: number; // 0 = все время
  year?: number;
};

export const getTransactions = async ({
  categoryId,
  month = 0,
  year,
}: GetTransactionsParams = {}): Promise<Transaction[]> => {
  const db = await getDb();

  const monthStr =
    month && month > 0 ? month.toString().padStart(2, "0") : null;
  const yearStr = year ? year.toString() : null;

  const rows = await db.getAllAsync<TransactionRow>(
    `
    SELECT
      t.id,
      t.date,
      t.count,
      t.note,
      t.gasValue,
      t.categoryId,

      c.name        AS category_name,
      c.color       AS category_color,
      c.icon        AS category_icon,
      c.type        AS category_type,
      c.isArchive   AS category_isArchive,
      c.isGas       AS category_isGas,
      c.gasType     AS category_gasType,
      c.gasPrice    AS category_gasPrice

    FROM transactions t
    LEFT JOIN categories c ON c.id = t.categoryId

    WHERE (:categoryId IS NULL OR t.categoryId = :categoryId)
      AND (
        :month = 0
        OR :month IS NULL
        OR (
          strftime('%m', t.date) = :monthStr
          AND strftime('%Y', t.date) = :yearStr
        )
      )
    ORDER BY t.date DESC
    `,
    {
      categoryId: categoryId ?? null,
      month,
      monthStr,
      yearStr,
    },
  );

  return rows.map(mapTransactionFromRow);
};
