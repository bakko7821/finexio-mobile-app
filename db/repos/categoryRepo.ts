import { getDB } from "@/db";

type CreateCategoryDTO = {
  name: string;
  icon: string;
  color: string;
  type: number;
};

export const createCategory = async (data: CreateCategoryDTO) => {
  const db = await getDB();

  await db.runAsync(
    `INSERT INTO finance_category (name, icon, color, type)
     VALUES (?, ?, ?, ?)`,
    [data.name, data.icon, data.color, data.type],
  );
};

export interface Category {
  id: number;
  name: string;
  icon?: string;
  color?: string;
  type: number;
}

export const getCategoriesByType = async (
  type: number,
): Promise<Category[]> => {
  const db = await getDB();

  // runAsync возвращает SQLiteRunResult
  const result = await db.runAsync(
    `SELECT * FROM finance_category WHERE type = ?`,
    [type],
  );

  // result содержит rows.item(i) для каждой строки
  const categories: Category[] = [];

  // @ts-ignore — TS не знает про rows в SQLiteRunResult
  for (let i = 0; i < result.rows.length; i++) {
    // @ts-ignore
    categories.push(result.rows.item(i));
  }

  return categories;
};
