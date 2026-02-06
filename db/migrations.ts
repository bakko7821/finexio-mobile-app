import { SQLiteDatabase } from "expo-sqlite";

// -- DROP TABLE IF EXISTS category_gas_settings; -- убрали
// -- DROP TABLE IF EXISTS transactions;
// -- DROP TABLE IF EXISTS categories;

export async function initDatabase(db: SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      color TEXT NOT NULL,
      icon TEXT NOT NULL,
      type INTEGER NOT NULL,
      is_gas INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS category_gas_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER NOT NULL UNIQUE,
      gas_type TEXT NOT NULL,
      gas_value REAL NOT NULL DEFAULT 0,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER NOT NULL,
      type INTEGER NOT NULL,
      count REAL NOT NULL,
      note TEXT,
      date TEXT NOT NULL,
      gas_value REAL DEFAULT 0, -- новое поле
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_transactions_date 
      ON transactions(date);

    CREATE INDEX IF NOT EXISTS idx_transactions_category 
      ON transactions(category_id);
  `);
}
