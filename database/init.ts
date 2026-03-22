import { getRandomColor } from "@/utils/colors";
import { SQLiteDatabase } from "expo-sqlite";

export const initDatabase = async (db: SQLiteDatabase): Promise<void> => {
  try {
    // 1. pragma отдельно
    await db.execAsync("PRAGMA foreign_keys = ON;");

    // 2. таблицы по одной (или runAsync)
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        color TEXT NOT NULL,
        icon TEXT NOT NULL,
        type INTEGER NOT NULL,
        isArchive INTEGER DEFAULT 0,
        isGas INTEGER DEFAULT 0,
        gasType TEXT,
        gasPrice REAL
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS subcategories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        value REAL DEFAULT 0,
        categoryId INTEGER NOT NULL,
        FOREIGN KEY (categoryId) REFERENCES categories(id)
          ON DELETE CASCADE
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        count REAL NOT NULL,
        categoryId INTEGER NOT NULL,
        subCategoryId INTEGER,
        note TEXT,
        gasValue REAL,
        FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE CASCADE,
        FOREIGN KEY (subCategoryId) REFERENCES subcategories(id) ON DELETE SET NULL
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS wallets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        icon TEXT NOT NULL,
        color TEXT NOT NULL,
        value REAL DEFAULT 0
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT
      );
    `);

    console.log("DB INIT SUCCESS");
  } catch (e) {
    console.error("DB INIT FAILED", e);
  }
};

export const initDefaultWallets = async (db: SQLiteDatabase): Promise<void> => {
  const [{ user_version }] = await db.getAllAsync<{
    user_version: number;
  }>("PRAGMA user_version;");

  if (user_version !== 0) {
    return;
  }

  await db.runAsync(
    `
    INSERT INTO wallets (id, name, icon, color, value)
    VALUES 
      (0, ?, ?, ?, 0),
      (1, ?, ?, ?, 0);
    `,
    ["Наличные", "money", getRandomColor(), "Карта", "card", getRandomColor()],
  );

  await db.execAsync("PRAGMA user_version = 1;");
};
