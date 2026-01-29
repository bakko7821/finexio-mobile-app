import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/utils/types/variables";
import React, { useState } from "react";
import { Text, View } from "react-native";
import ChartGraphIcon from "../assets/icons/chart-graph-ui-svgrepo-com.svg";
import ChartPieIcon from "../assets/icons/chart-pie-svgrepo-com.svg";
import ProfileIcon from "../assets/icons/profile-circle-svgrepo-com.svg";
import ReceiptIcon from "../assets/icons/receipt-item-svgrepo-com.svg";
import WalletIcon from "../assets/icons/wallet-money-svgrepo-com.svg";
import NavItem from "./NavItem";

export default function Nav() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <View className="relative w-full flex flex-row items-center justify-between bg-gray-400 p-4 rounded-t-3xl">
      {isOpenMenu && (
        <View
          style={{
            zIndex: 999,
            height: SCREEN_HEIGHT,
            width: SCREEN_WIDTH * 0.6,
          }}
          className="absolute bottom-0 left-0 bg-pink-400"
        >
          <Text>123</Text>
        </View>
      )}
      <NavItem
        icon={<ProfileIcon width={24} height={24} color={"#000"} />}
        name="Меню"
        path=""
        isButton={true}
        buttonLogic={() => setIsOpenMenu(true)}
      />
      <NavItem
        icon={<WalletIcon width={24} height={24} color={"#000"} />}
        name="Кошелек"
        path="wallet"
      />
      <NavItem
        icon={<ChartPieIcon width={24} height={24} color={"#000"} />}
        name="Категории"
        path="category"
      />
      <NavItem
        icon={<ReceiptIcon width={24} height={24} color={"#000"} />}
        name="Операции"
        path="receipt"
      />
      <NavItem
        icon={<ChartGraphIcon width={24} height={24} color={"#000"} />}
        name="Обзор"
        path="chart"
      />
    </View>
  );
}
