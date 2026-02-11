export type CreateTransactionDto = {
  date: string;
  count: number;
  categoryId: number;

  note?: string;
  gasValue?: number;
};
