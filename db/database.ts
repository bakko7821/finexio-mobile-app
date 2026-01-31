import * as SQLite from "expo-sqlite";
import { initDatabase } from "./migrations";

let database: SQLite.SQLiteDatabase | null = null;

export async function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (!database) {
    database = await SQLite.openDatabaseAsync("database.db");
    await initDatabase(database);
  }
  return database;
}
