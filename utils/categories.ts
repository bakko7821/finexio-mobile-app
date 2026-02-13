export type CreateCategoryDto = {
  name: string;
  color: string;
  icon: string;
  type: number;

  isArchive?: boolean;
  isGas?: boolean;

  gasType?: string;
  gasPrice?: number;

  subcategories?: CreateSubCategoryDto[];
};

export type UpdateCategoryDto = {
  name?: string;
  icon?: string;
  color?: string;

  gasType?: string;
  gasPrice?: number;

  isArchive?: boolean;
  subcategories?: UpdateSubCategoryDto[];
};

export type UpdateSubCategoryDto = {
  id?: number; // если есть → update, если нет → create
  name: string;
};

export type Category = {
  id: number;
  name: string;
  color: string;
  icon: string;
  type: number;

  isArchive?: boolean;
  isGas?: boolean;

  gasType?: string;
  gasPrice?: number;

  subcategories?: SubCategory[];
};

export type CreateSubCategoryDto = {
  name: string;
};

export type SubCategory = {
  id: number;
  name: string;
  value: number;
};

export type SubCategoryFormItem = {
  id?: number; // есть → существующая
  name: string;
  value?: number;
  isNew: boolean;
};
