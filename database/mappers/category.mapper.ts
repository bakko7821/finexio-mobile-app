import { Category } from "@/utils/categories";

export type CategoryWithSubRow = {
  category_id: number;
  category_name: string;
  category_color: string;
  category_icon: string;
  category_type: number;
  category_isArchive: number;
  category_isGas: number;
  category_gasType: string | null;
  category_gasPrice: number | null;

  sub_id: number | null;
  sub_name: string | null;
  sub_value: number | null;
};

export const mapCategoriesWithSubs = (
  rows: CategoryWithSubRow[],
): Category[] => {
  const map = new Map<number, Category>();

  for (const row of rows) {
    if (!map.has(row.category_id)) {
      map.set(row.category_id, {
        id: row.category_id,
        name: row.category_name,
        color: row.category_color,
        icon: row.category_icon,
        type: row.category_type,
        isArchive: Boolean(row.category_isArchive),
        isGas: Boolean(row.category_isGas),
        gasType: row.category_gasType ?? undefined,
        gasPrice: row.category_gasPrice ?? undefined,
        subcategories: [],
      });
    }

    if (row.sub_id) {
      map.get(row.category_id)!.subcategories!.push({
        id: row.sub_id,
        name: row.sub_name!,
        value: row.sub_value ?? 0,
      });
    }
  }

  return Array.from(map.values());
};
