import { Category, CreateCategoryDto } from "@/utils/types/categories";
import { getDb } from "./database";

export async function createCategory(
  dto: CreateCategoryDto,
): Promise<Category> {
  const db = await getDb();

  const result = await db.runAsync(
    `
    INSERT INTO categories (name, color, icon, type)
    VALUES (?, ?, ?, ?)
    `,
    [dto.name, dto.color, dto.icon ?? null, dto.type],
  );

  return {
    id: result.lastInsertRowId,
    ...dto,
  };
}

export async function getCategoriesByType(type: number): Promise<Category[]> {
  const db = await getDb();

  const rows = await db.getAllAsync<Category>(
    `
    SELECT * FROM categories
    WHERE type = ?
    ORDER BY id DESC
    `,
    [type],
  );

  return rows;
}
