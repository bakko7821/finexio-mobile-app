import {
  Category,
  CreateCategoryDto,
  SubCategory,
  UpdateCategoryDto,
} from "@/utils/types/categories";
import { getDb } from "../db";
import {
  CategoryWithSubRow,
  mapCategoriesWithSubs,
} from "../mappers/category.mapper";

export const createCategory = async (
  dto: CreateCategoryDto,
): Promise<{ categoryId: number; subcategories: SubCategory[] }> => {
  const db = await getDb();

  await db.execAsync("BEGIN TRANSACTION");

  try {
    const result = await db.runAsync(
      `
      INSERT INTO categories (
        name, color, icon, type,
        isArchive, isGas, gasType, gasPrice
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?  )
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

    const categoryId = result.lastInsertRowId;

    const insertedSubcategories: SubCategory[] = [];

    if (dto.subcategories?.length) {
      for (const sub of dto.subcategories) {
        const subResult = await db.runAsync(
          `
          INSERT INTO subcategories (name, categoryId)
          VALUES (?, ?)
          `,
          [sub.name, categoryId],
        );

        insertedSubcategories.push({
          id: subResult.lastInsertRowId,
          name: sub.name,
          value: 0, // ✅ присваиваем value
        });
      }
    }

    await db.execAsync("COMMIT");

    return { categoryId, subcategories: insertedSubcategories };
  } catch (e) {
    await db.execAsync("ROLLBACK");
    throw e;
  }
};

export const updateCategory = async (
  id: number,
  dto: UpdateCategoryDto,
): Promise<Category[]> => {
  const db = await getDb();

  await db.execAsync("BEGIN");

  try {
    // 1️⃣ Проверка категории
    const existing = await db.getFirstAsync<any>(
      `SELECT * FROM categories WHERE id = ?`,
      [id],
    );

    if (!existing) {
      throw new Error(`Category with id ${id} not found`);
    }

    // 2️⃣ Обновляем категорию
    await db.runAsync(
      `
      UPDATE categories
      SET
        name = ?,
        icon = ?,
        color = ?,
        gasType = ?,
        gasPrice = ?,
        isArchive = ?
      WHERE id = ?
      `,
      [
        dto.name ?? existing.name,
        dto.icon ?? existing.icon,
        dto.color ?? existing.color,
        dto.gasType ?? existing.gasType,
        dto.gasPrice ?? existing.gasPrice,
        dto.isArchive ?? existing.isArchive,
        id,
      ],
    );

    // 3️⃣ Сабкатегории
    if (dto.subcategories?.length) {
      for (const sub of dto.subcategories) {
        if (sub.id) {
          // update
          await db.runAsync(
            `
            UPDATE subcategories
            SET name = ?
            WHERE id = ? AND categoryId = ?
            `,
            [sub.name, sub.id, id],
          );
        } else {
          // create
          await db.runAsync(
            `
            INSERT INTO subcategories (name, categoryId)
            VALUES (?, ?)
            `,
            [sub.name, id],
          );
        }
      }
    }

    await db.execAsync("COMMIT");
  } catch (e) {
    await db.execAsync("ROLLBACK");
    throw e;
  }

  // 4️⃣ Возвращаем обновлённую категорию с сабами
  const rows = await db.getAllAsync<any>(
    `
    SELECT *
    FROM categories
    WHERE id = ?
    `,
    [id],
  );

  return mapCategoriesWithSubs(rows);
};

export const getCategoriesByType = async (
  type: number,
): Promise<Category[]> => {
  const db = await getDb();

  const rows = await db.getAllAsync<CategoryWithSubRow>(
    `
    SELECT
      c.id            AS category_id,
      c.name          AS category_name,
      c.color         AS category_color,
      c.icon          AS category_icon,
      c.type          AS category_type,
      c.isArchive     AS category_isArchive,
      c.isGas         AS category_isGas,
      c.gasType       AS category_gasType,
      c.gasPrice      AS category_gasPrice,

      s.id            AS sub_id,
      s.name          AS sub_name,
      s.value         AS sub_value
    FROM categories c
    LEFT JOIN subcategories s ON s.categoryId = c.id
    WHERE c.isArchive = 0 AND c.type = ?
    ORDER BY c.id, s.id
    `,
    [type],
  );

  return mapCategoriesWithSubs(rows);
};

export async function deleteCategory(id: number): Promise<void> {
  const db = await getDb();

  await db.runAsync(`DELETE FROM categories WHERE id = ?`, [id]);
}
