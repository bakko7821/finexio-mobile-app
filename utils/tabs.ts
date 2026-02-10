import type { Href } from "expo-router";
import type { ComponentType } from "react";
import type { SvgProps } from "react-native-svg";

import CategoryIcon from "@/assets/ui/Category.svg";
import TransactionsIcon from "@/assets/ui/Transaction.svg";
import WalletIcon from "@/assets/ui/Wallet.svg";
import ChartIcon from "@/assets/ui/chart-pie-svgrepo-com.svg";

export const TAB_ROUTES = {
  transactions: "/(tabs)/transactions",
  categories: "/(tabs)/categories",
  wallet: "/(tabs)/wallet",
  chart: "/(tabs)/chart",
} as const satisfies Record<string, Href>;

export type TabName = keyof typeof TAB_ROUTES;

type TabIcon = ComponentType<SvgProps>;

export const TABS: {
  name: TabName;
  label: string;
  icon: TabIcon;
}[] = [
  { name: "categories", label: "Категории", icon: CategoryIcon },
  { name: "transactions", label: "Транзакции", icon: TransactionsIcon },
  { name: "wallet", label: "Кошелек", icon: WalletIcon },
  { name: "chart", label: "Статистика", icon: ChartIcon },
];
