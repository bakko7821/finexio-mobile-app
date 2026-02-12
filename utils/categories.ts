export type CreateCategoryDto = {
  name: string;
  color: string;
  icon: string;
  type: number;

  isArchive?: boolean;
  isGas?: boolean;

  gasType?: string;
  gasPrice?: number;

  subcategoryIds?: number[];
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

  subcategoryIds?: number[];
};
