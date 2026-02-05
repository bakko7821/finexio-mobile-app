import "@/global.css";
import { useTheme } from "@/hooks/useTheme";
import { withOpacity } from "@/utils/color";
import React from "react";
import { Text, View } from "react-native";

interface BasicHeaderProps {
  title: string;
}

export default function BasicHeader({ title }: BasicHeaderProps) {
  const theme = useTheme();

  return (
    <View
      style={{ backgroundColor: theme.header }}
      className="overflow-hidden w-full flex flex-row items-center justify-between p-4 pt-[52px] rounded-b-3xl"
    >
      <Text style={{ color: theme.text }} className="text-xl font-medium">
        {title}
      </Text>
      <Text
        style={{ color: withOpacity(theme.text, 0.6) }}
        className="text-sm font-medium"
      >
        13.976 ₽
      </Text>
    </View>
  );
}
