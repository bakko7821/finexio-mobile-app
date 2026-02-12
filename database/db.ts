import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;

export const getDb = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("finexio1.db");
  }
  return db;
};