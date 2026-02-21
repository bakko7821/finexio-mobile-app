import { Wallet } from "@/utils/types/wallet";

export type WalletRow = {
  wallet_id: number;
  wallet_name: string;
  wallet_icon: string;
  wallet_color: string;
  wallet_value: number | null;
};

export const mapWallets = (rows: WalletRow[]): Wallet[] => {
  return rows.map((row) => ({
    id: row.wallet_id,
    name: row.wallet_name,
    icon: row.wallet_icon,
    color: row.wallet_color,
    value: row.wallet_value ?? 0,
  }));
};
