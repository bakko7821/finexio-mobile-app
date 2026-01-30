export type Season = "winter" | "spring" | "summer" | "autumn";

export const getSeason = (date: Date = new Date()): Season => {
  const month = date.getMonth() + 1; // getMonth() 0-11

  if (month === 12 || month === 1 || month === 2) return "winter";
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  return "autumn";
};
