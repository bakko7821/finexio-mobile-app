import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "@/utils/types/categories";
import { getDb } from "./database";

function mapCategoryRow(row: any): Category {
  return {
    id: row.id,
    name: row.name,
    color: row.color,
    icon: row.icon,
    type: row.type,
    isGas: !!row.is_gas,
    gasSettings: row.is_gas
      ? {
          gasType: row.gas_type,
          gasValue: row.gas_value,
        }
      : undefined,
  };
}

function computeIsGas(name: string, icon: string): boolean {
  const gasNames = ["Топливо", "Бензин", "Заправка"];
  return gasNames.includes(name) && icon === "gas";
}

export async function createCategory(
  dto: CreateCategoryDto,
): Promise<Category> {
  const db = await getDb();

  const isGas = computeIsGas(dto.name, dto.icon);

  const result = await db.runAsync(
    `
    INSERT INTO categories (name, color, icon, type, is_gas)
    VALUES (?, ?, ?, ?, ?)
    `,
    [dto.name, dto.color, dto.icon, dto.type, isGas ? 1 : 0],
  );

  const categoryId = result.lastInsertRowId;

  if (isGas && dto.gasSettings) {
    await db.runAsync(
      `
      INSERT INTO category_gas_settings (category_id, gas_type, gas_value)
      VALUES (?, ?, ?)
      `,
      [categoryId, dto.gasSettings.gasType, dto.gasSettings.gasValue],
    );
  }

  const rows = await db.getAllAsync<any>(
    `
    SELECT
      c.*,
      gs.gas_type,
      gs.gas_value
    FROM categories c
    LEFT JOIN category_gas_settings gs
      ON gs.category_id = c.id
    WHERE c.id = ?
    `,
    [categoryId],
  );

  return mapCategoryRow(rows[0]);
}

export async function getCategoriesByType(type: number): Promise<Category[]> {
  const db = await getDb();

  const rows = await db.getAllAsync<any>(
    `
    SELECT
      c.*,
      gs.gas_type,
      gs.gas_value
    FROM categories c
    LEFT JOIN category_gas_settings gs
      ON gs.category_id = c.id
    WHERE c.type = ?
    ORDER BY c.id DESC
    `,
    [type],
  );

  return rows.map(mapCategoryRow);
}

export async function updateCategory(
  id: number,
  dto: UpdateCategoryDto,
): Promise<Category> {
  const db = await getDb();

  const existingRows = await db.getAllAsync<any>(
    `SELECT * FROM categories WHERE id = ?`,
    [id],
  );

  if (!existingRows[0]) {
    throw new Error(`Category with id ${id} not found`);
  }

  const isGas = computeIsGas(dto.name, dto.icon);

  if (isGas && dto.gasSettings) {
    await db.runAsync(
      `
    INSERT INTO category_gas_settings (category_id, gas_type, gas_value)
    VALUES (?, ?, ?)
    ON CONFLICT(category_id) DO UPDATE SET
      gas_type = excluded.gas_type,
      gas_value = excluded.gas_value
    `,
      [id, dto.gasSettings.gasType, dto.gasSettings.gasValue],
    );
  } else {
    // если категория перестала быть топливной, удаляем запись в category_gas_settings
    await db.runAsync(
      `
    DELETE FROM category_gas_settings
    WHERE category_id = ?
    `,
      [id],
    );
  }

  const rows = await db.getAllAsync<any>(
    `
    SELECT
      c.*,
      gs.gas_type,
      gs.gas_value
    FROM categories c
    LEFT JOIN category_gas_settings gs
      ON gs.category_id = c.id
    WHERE c.id = ?
    `,
    [id],
  );

  return mapCategoryRow(rows[0]);
}

export async function deleteCategory(id: number): Promise<void> {
  const db = await getDb();

  await db.runAsync(
    `
    DELETE FROM categories
    WHERE id = ?
    `,
    [id],
  );
}
