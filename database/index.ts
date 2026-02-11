import * as SQLite from "expo-sqlite";

export let db: SQLite.SQLiteDatabase;

export const getDb = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("finexio.db");
  }
  return db;
};
