const now = new Date();

export function isoToDateSafe(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function dateToIso(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export const nowDay = getTodayISO();
export const nowMonth = now.getMonth() + 1;
export const nowYear = now.getFullYear();

export function getTodayISO(): string {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // месяцы 0–11
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatDateToDayMonth(isoDate: string): string {
  const date = new Date(isoDate);

  const months = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${day} ${month}`;
}

export function formatDateRelative(isoDate: string): string {
  const date = new Date(isoDate);
  const today = new Date();

  // Сброс времени для точного сравнения только по дате
  const dateOnly = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const diffInTime = todayOnly.getTime() - dateOnly.getTime();
  const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

  if (diffInDays === 0) return "Сегодня";
  if (diffInDays === 1) return "Вчера";

  return formatDateToDayMonth(isoDate);
}
