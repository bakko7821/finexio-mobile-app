import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "@/utils/types/categories";
import { getDb } from "./database";

export async function createCategory(
  dto: CreateCategoryDto,
): Promise<Category> {
  try {
    const db = await getDb();

    const result = await db.runAsync(
      `
    INSERT INTO categories (name, color, icon, type)
    VALUES (?, ?, ?, ?)
    `,
      [dto.name, dto.color, dto.icon, dto.type],
    );

    return {
      id: result.lastInsertRowId,
      ...dto,
    };
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
}

export async function getCategoriesByType(type: number): Promise<Category[]> {
  try {
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
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
}

export async function updateCategory(
  id: number,
  dto: UpdateCategoryDto,
): Promise<Category> {
  try {
    const db = await getDb();

    const rows = await db.getAllAsync<Category>(
      `
    SELECT * FROM categories
    WHERE id = ?
    `,
      [id],
    );

    const existing = rows[0];

    if (!existing) {
      throw new Error(`Category with id ${id} not found`);
    }

    await db.runAsync(
      `
    UPDATE categories
    SET name = ?, icon = ?, color = ?
    WHERE id = ?
    `,
      [dto.name, dto.icon, dto.color, id],
    );

    return {
      ...existing,
      ...dto,
    };
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
}

export async function deleteCategory(id: number) {
  try {
    const db = await getDb();

    const category = await db.getAllAsync<Category>(
      `
    SELECT * FROM categories
    WHERE id = ?
    `,
      [id],
    );

    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }

    await db.runAsync(
      `
    DELETE FROM categories
    WHERE id = ?
    `,
      [id],
    );
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
}
