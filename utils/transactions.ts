export type CreateTransactionDto = {
  date: string;      // ISO
  count: number;
  categoryId: number;

  note?: string;
  gasValue?: number;
};
