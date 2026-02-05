import BurgerMenuIcon from "@/assets/ui/MenuHamburger.svg";
import "@/global.css";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface BasicHeaderProps {
  title: string;
}

export default function BasicHeader({ title }: BasicHeaderProps) {
  const theme = useTheme();

  return (
    <View
      style={{ backgroundColor: theme.header }}
      className="overflow-hidden w-full flex flex-row items-center justify-between p-3 pt-[52px]"
    >
      <Text style={{ color: theme.text }} className="text-xl font-medium">
        {title}
      </Text>
      <View className="flex-row items-center justify-center gap-2">
        <Text
          style={{ color: theme.secondary }}
          className="text-sm font-regular"
        >
          13.976 ₽
        </Text>
        <TouchableOpacity className="items-center justify-center">
          <BurgerMenuIcon width={24} height={24} color={theme.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
