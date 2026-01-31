import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";

export default function HelpUsComponent() {
  const theme = useTheme();

  const openURL = async (url: string) => {
    // Проверяем, можно ли открыть ссылку
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.warn("Невозможно открыть ссылку:", url);
    }
  };

  return (
    <View className="flex-1 flex items-center justify-center gap-3 px-[48px] py-[32px]">
      <Text
        style={{ color: theme.secondary, textAlign: "center" }}
        className="font-medium text-base"
      >
        Приложение ещё в разработке. Поэтому на этом месте ничего нет. Вы можете
        предложить что хотели бы здесь видеть.
      </Text>
      <TouchableOpacity
        style={{ backgroundColor: theme.text }}
        className="p-3 rounded-xl"
        onPress={() => openURL("https://t.me/bakko28")}
      >
        <Text
          style={{ color: theme.background }}
          className="text-sm font-medium"
        >
          Отправить предложение
        </Text>
      </TouchableOpacity>
    </View>
  );
}
