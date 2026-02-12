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

export const groupTransactionsByDate = (
  transactions: Transaction[],
): GroupedTransactions[] => {
  const map = new Map<string, Transaction[]>();

  for (const tx of transactions) {
    if (!map.has(tx.date)) {
      map.set(tx.date, []);
    }
    map.get(tx.date)!.push(tx);
  }

  return Array.from(map.entries()).map(([date, txs]) => {
    const { day, month, year, date: parsedDate } = parseDate(date);

    return {
      date,
      label: getDateLabel(parsedDate),
      day,
      month,
      year,
      transactions: txs,
    };
  });
};
