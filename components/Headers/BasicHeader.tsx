import "@/global.css";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { Text, View } from "react-native";

interface BasicHeaderProps {
  title?: string;
  type?: number
}

export default function BasicHeader({type}: BasicHeaderProps) {
  const theme = useTheme();

  return (
    <View
      style={{ backgroundColor: theme.header }}
      className="overflow-hidden w-full flex flex-row items-center justify-between bg-gray-400 p-4 pt-[52px] rounded-b-3xl"
    >
      <Text style={{ color: theme.seasonColor }} className="text-sm">
        {type === 1 ? "Расходы" : "Доходы"}
      </Text>
      <Text style={{ color: theme.text }} className="text-sm font-medium">
        13.976 ₽
      </Text>
    </View>
  );
}
