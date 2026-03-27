import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;
let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

export const getDb = async (): Promise<SQLite.SQLiteDatabase> => {
  if (db) return db;

  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync("finexio4.db").then(
      async (database) => {
        await database.execAsync(`
        PRAGMA journal_mode = WAL;
        PRAGMA foreign_keys = ON;
      `);

        db = database;
        return database;
      },
    );
  }

  return dbPromise;
};
