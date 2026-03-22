import { getDb } from "../db";

export const getAllSettings = async () => {
  const db = await getDb();

  const rows = await db.getAllAsync<{ key: string; value: string }>(
    "SELECT key, value FROM settings",
  );

  return Object.fromEntries(rows.map((r) => [r.key, JSON.parse(r.value)]));
};

export const setSetting = async (key: string, value: any) => {
  const db = await getDb();

  await db.runAsync(
    `INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)`,
    [key, JSON.stringify(value)],
  );
};
