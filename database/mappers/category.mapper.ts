import { Category } from "@/utils/categories";

export type CategoryRow = {
  category_id: number;
  category_name: string;
  category_color: string;
  category_icon: string;
  category_type: number;

  category_isArchive?: number;
  category_isGas?: number;
  category_gasType?: string | null;
  category_gasPrice?: number | null;
};

export const mapCategoryFromRow = (row: CategoryRow): Category => ({
  id: row.category_id,
  name: row.category_name,
  color: row.category_color,
  icon: row.category_icon,
  type: row.category_type,

  isArchive: Boolean(row.category_isArchive),
  isGas: Boolean(row.category_isGas),

  gasType: row.category_gasType ?? undefined,
  gasPrice: row.category_gasPrice ?? undefined,
});
