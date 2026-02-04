import { Category } from "@/utils/types/categories";
import { getTransactionsByMonthAndType } from "./transactions";

export async function getTransactionSumsByCategory(
  month: number,
  year: number,
  type: number,
): Promise<{ category: Category; count: number }[]> {
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
}
