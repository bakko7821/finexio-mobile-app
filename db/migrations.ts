export const runMigrations = async (db: any) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS finance_category (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      icon TEXT NOT NULL,
      color TEXT NOT NULL,
      type INTEGER NOT NULL
    );
  `);
};
