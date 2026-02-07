import {
  Category,
  CreateCategoryDto,
  CreateSmallCategoryDto,
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
    smallCategories: [],
  };
}

function mapSmallCategoryRow(row: any) {
  return {
    id: row.id,
    categoryId: row.category_id,
    name: row.name,
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

  const smallCategories = [];

  if (dto.smallCategories?.length) {
    for (const name of dto.smallCategories) {
      const sc = await createSmallCategoryRaw(categoryId, name);
      smallCategories.push(sc);
    }
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

  const category = mapCategoryRow(rows[0]);
  category.smallCategories = smallCategories;

  return category;
}

async function createSmallCategoryRaw(categoryId: number, name: string) {
  const db = await getDb();

  const result = await db.runAsync(
    `
    INSERT INTO small_categories (category_id, name)
    VALUES (?, ?)
    `,
    [categoryId, name],
  );

  return {
    id: result.lastInsertRowId,
    categoryId,
    name,
  };
}

export async function createSmallCategory(dto: CreateSmallCategoryDto) {
  const db = await getDb();

  const result = await db.runAsync(
    `
    INSERT INTO small_categories (category_id, name)
    VALUES (?, ?)
    `,
    [dto.categoryId, dto.name],
  );

  return {
    id: result.lastInsertRowId,
    categoryId: dto.categoryId,
    name: dto.name,
  };
}

export async function getCategoriesByType(type: number): Promise<Category[]> {
  const db = await getDb();

  const categoryRows = await db.getAllAsync<any>(
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

  const categories = categoryRows.map(mapCategoryRow);

  const categoryIds = categories.map((c) => c.id);
  if (categoryIds.length === 0) return categories;

  const smallRows = await db.getAllAsync<any>(
    `
    SELECT *
    FROM small_categories
    WHERE category_id IN (${categoryIds.map(() => "?").join(",")})
    `,
    categoryIds,
  );

  for (const row of smallRows) {
    const cat = categories.find((c) => c.id === row.category_id);
    if (cat) {
      cat.smallCategories.push(mapSmallCategoryRow(row));
    }
  }

  return categories;
}

export async function updateCategory(
  id: number,
  dto: UpdateCategoryDto,
): Promise<Category> {
  const db = await getDb();

  // Получаем текущую категорию
  const existingRows = await db.getAllAsync<any>(
    `SELECT * FROM categories WHERE id = ?`,
    [id],
  );

  if (!existingRows[0]) {
    throw new Error(`Category with id ${id} not found`);
  }

  const existing = existingRows[0];

  // Определяем isGas: если категория уже топливная, оставляем true
  // иначе считаем по computeIsGas
  const isGas = !!existing.is_gas || computeIsGas(dto.name, dto.icon);

  // Обновляем поля категории
  await db.runAsync(
    `
    UPDATE categories
    SET name = ?, icon = ?, color = ?, is_gas = ?
    WHERE id = ?
    `,
    [dto.name, dto.icon, dto.color, isGas ? 1 : 0, id],
  );

  // Если категория топливная и пришли gasSettings — вставляем или апдейтим
  if (isGas && dto.gasSettings) {
    await db.runAsync(
      `
      INSERT INTO category_gas_settings (category_id, gas_type, gas_value)
      VALUES (?, ?, ?)
      ON CONFLICT(category_id) DO UPDATE SET
        gas_type = excluded.gas_type
      `,
      [id, dto.gasSettings.gasType, dto.gasSettings.gasValue],
    );
  }

  // Подтягиваем обновлённую категорию с gasSettings
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

  await db.runAsync(`DELETE FROM categories WHERE id = ?`, [id]);
}
