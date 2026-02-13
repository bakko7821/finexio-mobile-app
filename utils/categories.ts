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

export type Category = {
  id: number
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
}

export type SubCategory = {
  id: number;
  name: string;
  value: number;
}
