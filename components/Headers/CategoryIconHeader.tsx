import BackIcon from "@/assets/ui/arrow-prev-small-svgrepo-com.svg";
import { useTheme } from "@/hooks/useTheme";
import { getContrastColor } from "@/utils/color";
import { useRouter } from "expo-router";
import React, { Dispatch, SetStateAction } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { RenderIcon } from "../UI/RenderIcon";

interface CategoryIconHeaderProps {
  isColor: boolean;
  setIsColor: Dispatch<SetStateAction<boolean>>;
  selectedColor: string;
  selectedIcon: string;
}

export default function CategoryIconHeader({
  isColor = false,
  setIsColor,
  selectedColor,
  selectedIcon,
}: CategoryIconHeaderProps) {
  const theme = useTheme();
  const router = useRouter();

  return (
    <View
      className="flex-col w-full p-3 pt-[52px] pb-0"
      style={{
        backgroundColor: theme.header,
        // iOS
        shadowColor: theme.text,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,

        // Android
        elevation: 4,
      }}
    >
      <View className="flex-row items-center justify-between w-full">
        <View className="flex-row gap-3 items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <BackIcon width={24} height={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={{ color: theme.text }} className="text-base font-medium">
            Иконка категории
          </Text>
        </View>
        <TouchableOpacity
          style={{ backgroundColor: theme.primary }}
          className="px-2 py-1 rounded-xl bg-blue-500"
          onPress={() => router.back()}
        >
          <Text
            style={{ color: "#fff" }}
            className="px-2 py-1 rounded-xl text-sm font-medium"
          >
            Готово
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-col gap-2 items-center justify-center w-full">
        <View className="p-3">
          <View
            style={{ backgroundColor: selectedColor }}
            className="p-2 rounded-xl flex items-center justify-center"
          >
            <RenderIcon
              name={selectedIcon}
              width={36}
              height={36}
              color={getContrastColor(selectedColor)}
            />
          </View>
        </View>
        <View className="flex-row items-center justify-center gap-2">
          <TouchableOpacity
            onPress={() => setIsColor(false)}
            style={{ borderColor: !isColor ? theme.primary : "transparent" }}
            className="border-b-[2px] px-2 py-1 border-solid"
          >
            <Text style={{ color: theme.text }} className="text-sm font-medium">
              Иконка
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsColor(true)}
            style={{ borderColor: isColor ? theme.primary : "transparent" }}
            className="border-b-[2px] px-2 py-1 border-solid"
          >
            <Text style={{ color: theme.text }} className="text-sm font-medium">
              Цвет
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
