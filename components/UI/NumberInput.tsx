import CalendarIcon from "@/assets/ui/Calendar4Week.svg";
import ClearIcon from "@/assets/ui/ClearCharacterOutline.svg";
import TickIcon from "@/assets/ui/Tick.svg";
import { useTheme } from "@/hooks/useTheme";
import { getContrastColor } from "@/utils/color";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, "₽", 0, ","];

export default function NumberInput() {
  const theme = useTheme();
  return (
    <View className="py-2 flex-row items-center justify-center gap-2">
      <View className="flex-col"></View>
      <View className="flex-row flex-wrap gap-2 w-[160px] items-center justify-center">
        {numbers.map((num) => (
          <TouchableOpacity
            key={num}
            style={{
              backgroundColor: theme.background,
              borderColor: theme.secondary,
            }}
            className="w-[48px] h-[48px] border border-solid rounded-xl items-center justify-center"
          >
            <Text style={{ color: theme.text }} className="text-xl font-medium">
              {num}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View className="flex-col gap-2">
        <TouchableOpacity
          style={{ backgroundColor: theme.secondary }}
          className="w-[48px] h-[48px] rounded-xl items-center justify-center"
        >
          <ClearIcon width={24} height={24} color={theme.text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: theme.secondary }}
          className="w-[48px] h-[48px] rounded-xl items-center justify-center"
        >
          <CalendarIcon width={24} height={24} color={theme.text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: "#01B531" }}
          className="w-[48px] flex-1 rounded-xl items-center justify-center"
        >
          <TickIcon
            width={24}
            height={24}
            color={getContrastColor("#01B531")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
