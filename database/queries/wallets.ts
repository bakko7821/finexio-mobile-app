import { CreateWalletDto, UpdateWalletDto, Wallet } from "@/utils/types/wallet";
import { getDb } from "../db";
import { mapWallets, WalletRow } from "../mappers/wallet.mapper";

export const createWallet = async (dto: CreateWalletDto) => {
  const db = await getDb();

  await db.execAsync("BEGIN TRANSACTION");

  try {
    const result = await db.runAsync(
      `
      INSERT INTO wallets (
        name, color, icon, value
      )
      VALUES (?, ?, ?, ?)
      `,
      [dto.name, dto.color, dto.icon, dto.value ?? 0],
    );

    const insertedId = result.lastInsertRowId;

    const rows = await db.getAllAsync<WalletRow>(
      `
      SELECT 
        id as wallet_id,
        name as wallet_name,
        icon as wallet_icon,
        color as wallet_color,
        value as wallet_value
      FROM wallets
      WHERE id = ?
      `,
      [insertedId],
    );

    await db.execAsync("COMMIT");

    return mapWallets(rows)[0];
  } catch (e) {
    await db.execAsync("ROLLBACK");
    throw e;
  }
};

export const getWalletById = async (id: number): Promise<Wallet | null> => {
  const db = await getDb();

  const wallet = await db.getFirstAsync<Wallet>(
    `
    SELECT
      w.id,
      w.name,
      w.icon,
      w.color,
      w.value + COALESCE(SUM(
        CASE
          WHEN c.type = 1 THEN -t.count
          WHEN c.type = 2 THEN  t.count
          ELSE 0
        END
      ), 0) as value
    FROM wallets w
    LEFT JOIN transactions t ON t.walletId = w.id
    LEFT JOIN categories c ON c.id = t.categoryId
    WHERE w.id = ?
    GROUP BY w.id, w.name, w.icon, w.color, w.value
    `,
    [id],
  );

  return wallet ?? null;
};

export const getAllWallets = async (): Promise<Wallet[]> => {
  const db = await getDb();

  return await db.getAllAsync<Wallet>(
    `
    SELECT
      w.id,
      w.name,
      w.icon,
      w.color,
      w.value + COALESCE(SUM(
        CASE
          WHEN c.type = 1 THEN -t.count
          WHEN c.type = 2 THEN  t.count
          ELSE 0
        END
      ), 0) as value
    FROM wallets w
    LEFT JOIN transactions t ON t.walletId = w.id
    LEFT JOIN categories c ON c.id = t.categoryId
    GROUP BY w.id, w.name, w.icon, w.color, w.value
    ORDER BY w.id DESC
    `,
  );
};

export const updateWallet = async (
  id: number,
  dto: UpdateWalletDto,
): Promise<Wallet[]> => {
  const db = await getDb();

  await db.execAsync("BEGIN");

  try {
    const existing = await db.getFirstAsync<any>(
      `SELECT * FROM wallets WHERE id = ?`,
      [id],
    );

    if (!existing) {
      throw new Error(`Wallet with id ${id} not found`);
    }

    await db.runAsync(
      `
      UPDATE wallets
      SET
        name = ?,
        icon = ?,
        color = ?,
        value = ?
      WHERE id = ?
      `,
      [
        dto.name ?? existing.name,
        dto.icon ?? existing.icon,
        dto.color ?? existing.color,
        dto.value ?? existing.value,
        id,
      ],
    );

    await db.execAsync("COMMIT");
  } catch (e) {
    await db.execAsync("ROLLBACK");
    throw e;
  }

  const rows = await db.getAllAsync<any>(
    `
    SELECT *
    FROM wallets
    WHERE id = ?
    `,
    [id],
  );

  return mapWallets(rows);
};
