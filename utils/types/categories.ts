export type Category = {
  id: number;
  name: string;
  color: string;
  icon: string;
  type: number;
};

export type CreateCategoryDto = {
  name: string;
  color: string;
  icon: string;
  type: number;
};

export type UpdateCategoryDto = {
  name: string;
  icon: string;
  color: string;
};

