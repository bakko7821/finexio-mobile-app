import BackIcon from "@/assets/icons/arrow-prev-small-svgrepo-com.svg";
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function CategoryIconHeader() {
  const theme = useTheme();
  const router = useRouter();

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
          <Text style={{ color: "#fff" }} className="text-sm font-medium">
            Готово
          </Text>
        </TouchableOpacity>
      </View>
      <View className="relative pl-[48px] pr-[64px] py-3">
        
      </View>
    </View>
  );
}
