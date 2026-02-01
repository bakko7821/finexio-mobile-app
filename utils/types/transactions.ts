import { formatDateRelative } from "../date";
import { Category } from "./categories";

export interface Transaction {
  id: number;
  type: number;
  count: number;
  note?: string;
  date: string; // ISO
  category: Category;
}

export interface CreateTransactionDto {
  categoryId: number;
  type: number;
  count: number;
  note?: string;
  date: string; // ISO
}

export interface TransactionGroup {
  label: string; // "Сегодня", "Вчера" или "7 Февраля"
  sum: number; // корректная сумма за день
  items: Transaction[]; // массив транзакций
}

export function groupTransactions(
  transactions: Transaction[],
): TransactionGroup[] {
  const groups: Record<string, { sum: number; items: Transaction[] }> = {};

  transactions.forEach((tx) => {
    const dateKey = tx.date.split("T")[0]; // YYYY-MM-DD

    if (!groups[dateKey]) groups[dateKey] = { sum: 0, items: [] };

    // Корректная сумма с учётом типа
    if (tx.type === 1) {
      groups[dateKey].sum -= tx.count; // расход → вычитаем
    } else if (tx.type === 2) {
      groups[dateKey].sum += tx.count; // доход → прибавляем
    }

    groups[dateKey].items.push(tx);
  });

  // Преобразуем в массив и сортируем по дате DESC
  return Object.entries(groups)
    .sort((a, b) => (b[0] > a[0] ? 1 : -1))
    .map(([date, { sum, items }]) => ({
      label: formatDateRelative(date),
      sum,
      items,
    }));
}

export interface CategoryPercent {
  category: Category;
  percent: number; // число от 0 до 100
}

export function calculateCategoryPercent(
  transactions: Transaction[]
): CategoryPercent[] {
  if (transactions.length === 0) return [];

  // 1. Общая сумма по всем транзакциям
  const totalSum = transactions.reduce((sum, tx) => {
    return tx.type === 1 ? sum + tx.count : sum + tx.count; // расходы и доходы считаем как положительные числа
  }, 0);

  if (totalSum === 0) return [];

  // 2. Сумма по категориям
  const categoryMap = new Map<number, { category: typeof transactions[0]["category"]; sum: number }>();

  transactions.forEach(tx => {
    const catId = tx.category.id;
    if (!categoryMap.has(catId)) {
      categoryMap.set(catId, { category: tx.category, sum: 0 });
    }

    categoryMap.get(catId)!.sum += tx.count; // складываем
  });

  // 3. Преобразуем в массив с процентами
  const result: CategoryPercent[] = [];
  categoryMap.forEach(({ category, sum }) => {
    const percent = (sum / totalSum) * 100;
    result.push({ category, percent });
  });

  return result;
}
