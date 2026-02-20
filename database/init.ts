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

      FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE CASCADE
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
  `);
};
