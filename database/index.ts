import { getDb } from "./db";
import { initDatabase } from "./init";

let initialized = false;

export const initOnce = async () => {
  if (initialized) return;

  const db = await getDb();
  console.log("DB instance", db);
  await initDatabase(db);
  initialized = true;
};

export { getDb };

  export * from "./queries/categories";
  export * from "./queries/transactions";

