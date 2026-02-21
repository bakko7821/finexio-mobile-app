import { PieItem } from "@/utils/types/chart";
import { getDb } from "..";

export const getChartData = async ({
  type,
  month,
  year,
}: {
  type: number;
  month: number;
  year: number;
}): Promise<PieItem[]> => {
  const db = await getDb();

  const monthStr = month.toString().padStart(2, "0");
  const yearStr = year.toString();

  const rows = await db.getAllAsync<{
    categoryId: number;
    sumCount: number;
    color: string;
    name: string;
    icon: string;
  }>(
    `
    SELECT 
      t.categoryId,
      SUM(t.count) AS sumCount,
      c.color,
      c.name,
      c.icon
    FROM transactions t
    INNER JOIN categories c ON c.id = t.categoryId
    WHERE c.type = ? 
      AND c.isArchive = 0
      AND strftime('%m', t.date) = ? 
      AND strftime('%Y', t.date) = ?
    GROUP BY t.categoryId
    ORDER BY sumCount DESC
    `,
    [type, monthStr, yearStr],
  );

  if (!rows.length) return [];

  // берем топ-5
  const top5 = rows.slice(0, 5);

  // суммируем остальные
  const othersSum = rows.slice(5).reduce((acc, row) => acc + row.sumCount, 0);

  const result: PieItem[] = top5.map((row) => ({
    value: row.sumCount,
    color: row.color,
    text: row.name,
    icon: row.icon,
  }));

  if (othersSum > 0) {
    result.push({
      value: othersSum,
      color: "#9c9c9c",
      text: "Прочие",
      icon: "recycle",
    });
  }

  return result;
};

export const getSumByType = async ({
  type,
  month,
  year,
}: {
  type: number;
  month: number;
  year: number;
}): Promise<number> => {
  const db = await getDb();

  const monthStr = month.toString().padStart(2, "0");
  const yearStr = year.toString();

  const rows = await db.getAllAsync<{ total: number }>(
    `
    SELECT SUM(t.count) AS total
    FROM transactions t
    INNER JOIN categories c ON c.id = t.categoryId
    WHERE c.type = ? 
      AND c.isArchive = 0
      AND strftime('%m', t.date) = ? 
      AND strftime('%Y', t.date) = ?
    `,
    [type, monthStr, yearStr],
  );

  return rows[0]?.total ?? 0;
};
