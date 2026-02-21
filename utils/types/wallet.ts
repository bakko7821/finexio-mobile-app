export type CreateWalletDto = {
  name: string;
  icon: string;
  color: string;
  value: number;
};

export type Wallet = {
  id: number;
  name: string;
  icon: string;
  color: string;
  value: number;
};
