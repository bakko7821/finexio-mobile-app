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
