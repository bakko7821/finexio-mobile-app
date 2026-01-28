import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import ChartGraphIcon from "../assets/icons/chart-graph-ui-svgrepo-com.svg";
import ChartPieIcon from "../assets/icons/chart-pie-svgrepo-com.svg";
import ProfileIcon from "../assets/icons/profile-circle-svgrepo-com.svg";
import ReceiptIcon from "../assets/icons/receipt-item-svgrepo-com.svg";
import WalletIcon from "../assets/icons/wallet-money-svgrepo-com.svg";
import NavItem from "./NavItem";

export default function Nav() {
  const router = useRouter();

  return (
    <View className="w-full flex flex-row items-center justify-between bg-gray-400 p-4 rounded-t-3xl">
      <NavItem
        icon={<ProfileIcon width={24} height={24} />}
        name="Меню"
        path="menu"
      />
      <NavItem
        icon={<WalletIcon width={24} height={24} />}
        name="Кошелек"
        path="wallet"
      />
      <NavItem
        icon={<ChartPieIcon width={24} height={24} />}
        name="Категории"
        path="category"
      />
      <NavItem
        icon={<ReceiptIcon width={24} height={24} />}
        name="Операции"
        path="receipt"
      />
      <NavItem
        icon={<ChartGraphIcon width={24} height={24} />}
        name="Обзор"
        path="chart"
      />
    </View>
  );
}
