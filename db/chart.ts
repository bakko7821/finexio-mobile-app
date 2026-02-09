import { Category } from "@/utils/types/categories";
import { getDb } from "./database";
import { getTransactionsByMonthAndType } from "./transactions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

const USER_ID_KEY = 'user_id';

export async function getOrCreateUserId(): Promise<string> {
  let userId = await AsyncStorage.getItem(USER_ID_KEY);

  if (userId) {
    return userId;
  }

  userId = uuidv4();

  await AsyncStorage.setItem(USER_ID_KEY, userId);

  return userId;
}

export async function ensureUserExists(userId: string) {
  const db = await getDb();

  await db.runAsync(
    `INSERT OR IGNORE INTO user_info (id) VALUES (?)`,
    [userId]
  );
}

export async function fetchUserBalance(id: string) {
  try {
    const db = await getDb();

    const user = await db.getFirstAsync<{ money: number }>(
      `SELECT money FROM user_info WHERE id = ?`,
      [id],
    );

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    return user.money;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getTransactionSumsByCategory(
  month: number,
  year: number,
  type: number,
): Promise<{ category: Category; count: number }[]> {
  try {
    const transactions = await getTransactionsByMonthAndType(month, year, type);

    const sumsMap = new Map<number, { category: Category; count: number }>();

    for (const tx of transactions) {
      const catId = tx.category.id;

      if (!sumsMap.has(catId)) {
        sumsMap.set(catId, { category: tx.category, count: tx.count });
      } else {
        sumsMap.get(catId)!.count += tx.count;
      }
    }

    return Array.from(sumsMap.values());
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
}
