import { getRandomColor } from "@/utils/colors";
import { SQLiteDatabase } from "expo-sqlite";

export const initDatabase = async (db: SQLiteDatabase): Promise<void> => {
  await db.execAsync(`
    PRAGMA foreign_keys = ON;
    
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

    CREATE TABLE IF NOT EXISTS subcategories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      value REAL DEFAULT 0,
      categoryId INTEGER NOT NULL,

      FOREIGN KEY (categoryId) REFERENCES categories(id)
        ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS wallets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      icon TEXT NOT NULL,
      color TEXT NOT NULL,
      value REAL DEFAULT 0
    )

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `);
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
