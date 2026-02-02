import BackIcon from "@/assets/ui/arrow-prev-small-svgrepo-com.svg";
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface NavHeader {
  title: string;
  isSave?: boolean;
  handleDone?: () => void;
}

export default function NavHeader({
  title,
  isSave = false,
  handleDone,
}: NavHeader) {
  const theme = useTheme();
  const router = useRouter();
  return (
    <View
      style={{ backgroundColor: theme.header }}
      className="w-full p-4 pt-[52px] items-center justify-between flex-row"
    >
      <View className="flex-row gap-3 items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcon width={24} height={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={{ color: theme.text }} className="text-base font-medium">
          {title}
        </Text>
      </View>
      {isSave && (
        <TouchableOpacity
          style={{ backgroundColor: theme.primary }}
          className="px-2 py-1 rounded-xl"
          onPress={handleDone}
        >
          <Text
            style={{ color: "#fff" }}
            className="px-2 py-1 rounded-xl text-sm font-medium"
          >
            Сохранить
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
