import { GroupedTransactions, Transaction } from "./transactions";

const MONTHS_SHORT = [
  "янв.",
  "февр.",
  "март",
  "апр.",
  "апр.",
  "май",
  "июнь",
  "июль",
  "авг.",
  "сент.",
  "окт.",
  "нояб.",
  "дек.",
];

export const MONTHS_RU = {
  nominative: [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
  ],
  genitive: [
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
  ],
} as const;

const WEEK_DAYS = [
  "воскресенье",
  "понедельник",
  "вторник",
  "среда",
  "четверг",
  "пятница",
  "суббота",
];

export function getMonthYearByOffset(
  offset: number,
  baseDate: Date = new Date()
) {
  const date = new Date(
    baseDate.getFullYear(),
    baseDate.getMonth() + offset,
    1
  );

  return {
    month: date.getMonth() + 1, // 1–12 (для SQL)
    year: date.getFullYear(),
  };
}

export function getMonthYearTitle(
  offset: number,
  baseDate: Date = new Date(),
  locale: string = "ru-RU"
): string {
  const date = new Date(
    baseDate.getFullYear(),
    baseDate.getMonth() + offset,
    1
  );

  const formatted = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(date);

  // убираем " г." для UI
  return formatted.replace(" г.", "");
}

export const formatDateRu = (dateStr: string): string => {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  if (isNaN(date.getTime())) return "";

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const dayOfWeek = WEEK_DAYS[date.getDay()];
  const monthName = MONTHS_SHORT[month - 1]; // сокращённый месяц
  return `${dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)} ${day} ${monthName} ${year}г.`;
};

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

export const parseDate = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);
  const parsedDate = new Date(year, month - 1, day);

  return {
    date: parsedDate,
    day,
    month: MONTHS_RU.genitive[month - 1],
    year: String(year),
  };
};

export const getDateLabel = (date: Date): string => {
  if (isNaN(date.getTime())) {
    return "";
  }

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  if (isSameDay(date, today)) return "Сегодня";
  if (isSameDay(date, yesterday)) return "Вчера";

  return WEEK_DAYS[date.getDay()] ?? "";
};

const calculateGroupedCount = (transactions: Transaction[]) =>
  transactions.reduce((acc, tx) => {
    if (tx.category.isArchive) return acc;

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
