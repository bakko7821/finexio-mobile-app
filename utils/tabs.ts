import type { ComponentType } from "react";
import type { SvgProps } from "react-native-svg";

import CategoryIcon from "@/assets/ui/Category.svg";
// import ChartIcon from "@/assets/ui/chart-pie-svgrepo-com.svg";
import SettingIcon from "@/assets/ui/Settings.svg";
import TransactionsIcon from "@/assets/ui/Transaction.svg";
import WalletIcon from "@/assets/ui/Wallet.svg";

export type TabName = keyof typeof TAB_ROUTES;
export type SettingsTabName = keyof typeof SETTINGS_TAB_ROUTES;

type TabIcon = ComponentType<SvgProps>;

// main tabs
export const TAB_ROUTES = {
  transactions: "/(tabs)/transactions",
  categories: "/(tabs)/categories",
  wallet: "/(tabs)/wallet",
  settings: "/(tabs)/settings",
} as const;

export const TAB_PATHNAMES = {
  transactions: "/transactions",
  categories: "/categories",
  wallet: "/wallet",
  settings: "/settings",
} as const;

export const TABS: {
  name: TabName;
  label: string;
  icon: TabIcon;
}[] = [
  { name: "categories", label: "Категории", icon: CategoryIcon },
  { name: "transactions", label: "Транзакции", icon: TransactionsIcon },
  { name: "wallet", label: "Кошелек", icon: WalletIcon },
  { name: "settings", label: "Настройки", icon: SettingIcon },
];

// settings tabs
export const SETTINGS_TAB_ROUTES = {} as const;

export const SETTINGS_TAB_PATHNAMES = {} as const;

export const SETTINGS_TABS: {
  name: SettingsTabName;
  label: string;
  icon: TabIcon;
}[] = [];
