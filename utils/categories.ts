export type CreateCategoryDto = {
  name: string;
  color: string;
  icon: string;
  type: number;

  isArchive?: boolean;
  isGas?: boolean;

  subcategoryIds?: number[];
};
