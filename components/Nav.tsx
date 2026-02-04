import ChartGraphIcon from "@/assets/ui/chart-graph-ui-svgrepo-com.svg";
import ChartPieIcon from "@/assets/ui/chart-pie-svgrepo-com.svg";
import ProfileIcon from "@/assets/ui/profile-circle-svgrepo-com.svg";
import ReceiptIcon from "@/assets/ui/receipt-item-svgrepo-com.svg";
import WalletIcon from "@/assets/ui/wallet-money-svgrepo-com.svg";
import { useTheme } from "@/hooks/useTheme";
import React, { useState } from "react";
import { View } from "react-native";
import MenuComponent from "./Modals/MenuComponent";
import NavItem from "./NavItem";

export default function Nav() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const theme = useTheme();

  return (
    <View
      style={{ backgroundColor: theme.header }}
      className="w-full flex flex-row items-center justify-between p-3 rounded-t-3xl"
    >
      {isOpenMenu && (
        <MenuComponent
          visible={isOpenMenu}
          onClose={() => setIsOpenMenu(false)}
        />
      )}
      <NavItem
        icon={ProfileIcon}
        name="Меню"
        path=""
        isButton={true}
        buttonLogic={() => setIsOpenMenu(true)}
      />
      <NavItem icon={WalletIcon} name="Кошелек" path="wallet" />
      <NavItem icon={ChartPieIcon} name="Категории" path="category" />
      <NavItem icon={ReceiptIcon} name="Операции" path="transactions" />
      <NavItem icon={ChartGraphIcon} name="Обзор" path="chart" />
    </View>
  );
}
