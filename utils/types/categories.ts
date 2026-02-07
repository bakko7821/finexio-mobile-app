export type SmallCategory = {
  id: number;
  categoryId: number;
  name: string;
};

export type Category = {
  id: number;
  name: string;
  color: string;
  icon: string;
  type: number;
  smallCategories: SmallCategory[];
  isGas?: boolean;
  gasSettings?: CategoryGasSettings;
};

export type CreateSmallCategoryDto = {
  categoryId: number;
  name: string;
};

export type CreateCategoryDto = {
  name: string;
  color: string;
  icon: string;
  type: number;
  isGas?: boolean;
  gasSettings?: {
    gasType: string;
    gasValue: number;
  };
  smallCategories?: string[];
};

export type UpdateCategoryDto = {
  name: string;
  icon: string;
  color: string;
  isGas?: boolean;
  gasSettings?: {
    gasType: string;
    gasValue: number;
  };
};

export type CategoryGasSettings = {
  gasType: string;
  gasValue: number;
};

export type CategoryGasRow = {
  id: number;
  category_id: number;
  gas_type: string;
  gas_value: number;
};

