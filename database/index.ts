import { getDb } from "./db";
import { initDatabase, initDefaultWallets } from "./init";

let initPromise: Promise<void> | null = null;

export const initOnce = async () => {
  if (!initPromise) {
    initPromise = (async () => {
      const db = await getDb();
      console.log("DB instance", db);
      await initDatabase(db);
      await initDefaultWallets(db);
    })();
  }

  return initPromise;
};

export * from "./queries/categories";
export * from "./queries/chart";
export * from "./queries/subcategories";
export * from "./queries/transactions";
export * from "./queries/wallets";
