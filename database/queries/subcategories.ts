import { CreateSubCategoryDto } from "@/utils/types/categories";
import { getDb } from "../db";

export const updateSubCategory = async (
  id: number,
  dto: CreateSubCategoryDto,
) => {
  const db = await getDb();

  const existing = await db.getFirstAsync<any>(
    `SELECT * FROM subcategories WHERE id = ?`,
    [id],
  );

  if (!existing) {
    throw new Error(`Subcategory ${id} not found`);
  }

  await db.runAsync(
    `
    UPDATE subcategories
    SET
      name = ?
    WHERE id = ?
    `,
    [dto.name ?? existing.name, id],
  );
};

export async function deleteSubCategory(id: number): Promise<void> {
  const db = await getDb();

  await db.runAsync(`DELETE FROM subcategories WHERE id = ?`, [id]);
}
