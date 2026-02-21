import { CreateWalletDto, Wallet } from "@/utils/types/wallet";
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

export const getAllWallets = async (): Promise<Wallet[]> => {
  const db = await getDb();

  const rows = await db.getAllAsync<WalletRow>(
    `
    SELECT
      id    AS wallet_id,
      name  AS wallet_name,
      icon  AS wallet_icon,
      color AS wallet_color,
      value AS wallet_value
    FROM wallets
    ORDER BY id ASC
    `,
  );

  return mapWallets(rows);
};
