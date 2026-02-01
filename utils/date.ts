export function formatDateToDayMonth(isoDate: string): string {
  const date = new Date(isoDate);

  // Массив месяцев на русском
  const months = [
    "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
    "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
  ];

  const day = date.getDate();       // 1–31
  const month = months[date.getMonth()]; // 0–11

  return `${day} ${month}`;
}

export function formatDateRelative(isoDate: string): string {
  const date = new Date(isoDate);
  const today = new Date();
  
  // Сброс времени для точного сравнения только по дате
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const diffInTime = todayOnly.getTime() - dateOnly.getTime();
  const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

  if (diffInDays === 0) return "Сегодня";
  if (diffInDays === 1) return "Вчера";

  return formatDateToDayMonth(isoDate);
}
