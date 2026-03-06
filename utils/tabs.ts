import type { Href } from "expo-router";
import type { ComponentType } from "react";
import type { SvgProps } from "react-native-svg";

import CategoryIcon from "@/assets/ui/Category.svg";
import ChartIcon from "@/assets/ui/chart-pie-svgrepo-com.svg";
import SettingIcon from "@/assets/ui/Settings.svg";
import TransactionsIcon from "@/assets/ui/Transaction.svg";
import WalletIcon from "@/assets/ui/Wallet.svg";

export const TAB_ROUTES = {
  transactions: "/transactions",
  categories: "/categories",
  wallet: "/wallet",
  chart: "/chart",
  settings: "/settings",
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
  { name: "settings", label: "", icon: SettingIcon },
];
