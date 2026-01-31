import BackIcon from "@/assets/ui/arrow-prev-small-svgrepo-com.svg";
import QuetionIcon from "@/assets/ui/question-svgrepo-com.svg";
import { useTheme } from "@/hooks/useTheme";
import { getContrastColor } from "@/utils/color";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function CategoryIconHeader() {
  const theme = useTheme();
  const router = useRouter();

  const [isColor, setIsColor] = useState(false)

  return (
    <View
      style={{ backgroundColor: theme.header }}
      className="flex-col w-full p-3 pt-[52px]"
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
        <TouchableOpacity className="px-2 py-1 rounded-xl bg-blue-500">
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
            style={{ backgroundColor: "#EE741D" }}
            className="p-2 rounded-xl flex items-center justify-center"
          >
            <QuetionIcon
              width={36}
              height={36}
              color={getContrastColor("#EE741D")}
            />
          </View>
        </View>
        <View className="flex-row items-center justify-center gap-2">
          <TouchableOpacity>
            <Text>Иконка</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Цвет</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
