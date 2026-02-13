import { Category, CreateCategoryDto } from "@/utils/categories";
import { getDb } from "../db";

export const createCategory = async (
  dto: CreateCategoryDto,
): Promise<number> => {
  const db = await getDb();
  const result = await db.runAsync(
    `
    INSERT INTO categories (
      name, color, icon, type,
      isArchive, isGas, gasType, gasPrice
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      dto.name,
      dto.color,
      dto.icon,
      dto.type,
      dto.isArchive ? 1 : 0,
      dto.isGas ? 1 : 0,
      dto.gasType ?? null,
      dto.gasPrice ?? null,
    ],
  );

  return result.lastInsertRowId;
};

export const getCategoriesByType = async (
  type: number,
): Promise<Category[]> => {
  const db = await getDb();
  return await db.getAllAsync(
    `
    SELECT * FROM categories
    WHERE isArchive = 0 AND type = ?
    `,
    [type],
  );
};

export async function deleteCategory(id: number): Promise<void> {
  const db = await getDb();

  await db.runAsync(`DELETE FROM categories WHERE id = ?`, [id]);
}
