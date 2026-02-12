import { GroupedTransactions, Transaction } from "./transactions";

const MONTHS = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

const WEEK_DAYS = [
  "воскресенье",
  "понедельник",
  "вторник",
  "среда",
  "четверг",
  "пятница",
  "суббота",
];

const now = new Date();

export function isoToDateSafe(iso?: string): Date {
  return iso ? new Date(iso) : new Date();
}

export function dateToIso(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function getTodayISO(): string {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // месяцы 0–11
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export const nowDay = getTodayISO();
export const nowMonth = now.getMonth() + 1;
export const nowYear = now.getFullYear();

export const getCurrentMonthAndYear = (): { month: number; year: number } => {
  const today = new Date();

  return {
    month: today.getMonth() + 1, // getMonth() возвращает 0–11, поэтому +1
    year: today.getFullYear(),
  };
};

export const parseDate = (dateString: string) => {
  const date = new Date(dateString);

  return {
    day: String(date.getDate()),
    month: MONTHS[date.getMonth()],
    year: String(date.getFullYear()),
    date,
  };
};

export const getDateLabel = (date: Date): string => {
  const today = new Date();
  const yesterday = new Date();

  yesterday.setDate(today.getDate() - 1);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  if (isSameDay(date, today)) return "Сегодня";
  if (isSameDay(date, yesterday)) return "Вчера";

  return WEEK_DAYS[date.getDay()];
};

const calculateGroupedCount = (transactions: Transaction[]) =>
  transactions.reduce((acc, tx) => {
    return tx.category.type === 1 ? acc - tx.count : acc + tx.count;
  }, 0);

export const groupTransactionsByDate = (
  transactions: Transaction[],
): GroupedTransactions[] => {
  const map = new Map<string, Transaction[]>();

  for (const tx of transactions) {
    if (!map.has(tx.date)) {
      map.set(tx.date, []);
    }
    map.get(tx.date)!.unshift(tx); // ← добавляем в начало
  }

  return Array.from(map.entries()).map(([date, txs]) => {
    const { day, month, year, date: parsedDate } = parseDate(date);

    return {
      date,
      label: getDateLabel(parsedDate),
      day: String(day).padStart(2, "0"),
      month,
      year,
      groupedCount: calculateGroupedCount(txs),
      transactions: txs,
    };
  });
};
