import { getDb } from "./db";
import { initDatabase, initDefaultWallets } from "./init";

let initialized = false;

export const initOnce = async () => {
  if (initialized) return;

  const db = await getDb();
  console.log("DB instance", db);
  await initDatabase(db);
  await initDefaultWallets(db);
  initialized = true;
};

export { getDb };

export * from "./queries/categories";
export * from "./queries/chart";
export * from "./queries/subcategories";
export * from "./queries/transactions";
export * from "./queries/wallets";
