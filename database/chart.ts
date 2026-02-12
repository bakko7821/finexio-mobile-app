import { PieItem } from "@/utils/chart";
import { getDb } from ".";

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

  // форматируем месяц и день для SQL
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
      AND strftime('%m', t.date) = ? 
      AND strftime('%Y', t.date) = ?
    GROUP BY t.categoryId
    `,
    [type, monthStr, yearStr],
  );

  return rows.map((row) => ({
    value: row.sumCount,
    color: row.color,
    text: row.name,
    icon: row.icon,
  }));
};

export const getSumByType = async (type: number): Promise<number> => {
  const db = await getDb();

  const rows = await db.getAllAsync<{ total: number }>(
    `
    SELECT SUM(t.count) AS total
    FROM transactions t
    INNER JOIN categories c ON c.id = t.categoryId
    WHERE c.isArchive = 0
      AND c.type = ?
    `,
    [type]
  );

  return rows[0]?.total ?? 0;
};
