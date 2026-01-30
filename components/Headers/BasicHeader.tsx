import "@/global.css";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { Text, View } from "react-native";

export default function BasicHeader() {
  const theme = useTheme();

  return (
    <View
      style={{ backgroundColor: theme.header }}
      className="overflow-hidden w-full flex flex-row items-center justify-between bg-gray-400 p-4 pt-[52px] rounded-b-3xl"
    >
      <Text style={{ color: theme.seasonColor }} className="text-sm">
        Январь 28
      </Text>
      <Text style={{ color: theme.text }} className="text-sm font-medium">
        13.976 ₽
      </Text>
    </View>
  );
}
