import { Transaction } from "./transactions";

export type PieItem = {
  value: number; // сумма всех транзакций по категории
  color: string;
  text?: string;
  icon: string;
};

export function getSum(transactions: Transaction[]): number {
  return transactions.reduce((sum, transaction) => sum + transaction.count, 0);
}
