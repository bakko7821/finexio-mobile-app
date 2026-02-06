import ChartGraphIcon from "@/assets/ui/chart-graph-ui-svgrepo-com.svg";
import ChartPieIcon from "@/assets/ui/chart-pie-svgrepo-com.svg";
import ReceiptIcon from "@/assets/ui/receipt-item-svgrepo-com.svg";
import WalletIcon from "@/assets/ui/wallet-money-svgrepo-com.svg";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { View } from "react-native";
import NavItem from "./NavItem";

export default function Nav() {
  const theme = useTheme();

  return (
    <View
      style={{ backgroundColor: theme.header }}
      className="w-full flex flex-row items-center justify-between p-3 rounded-t-3xl"
    >
      <NavItem icon={WalletIcon} name="Кошелек" path="wallet" />
      <NavItem icon={ChartPieIcon} name="Категории" path="category" />
      <NavItem icon={ReceiptIcon} name="Операции" path="transactions" />
      <NavItem icon={ChartGraphIcon} name="Обзор" path="chart" />
    </View>
  );
}
