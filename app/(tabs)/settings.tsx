import Plug from "@/components/UI/Plug";
import { useTheme } from "@/hooks/useTheme";
import { Text, View } from "react-native";

export default function SettingsScreen() {
  const theme = useTheme();
  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="pt-[50px] flex-1 flex-col gap-2 items-start justify-start relative"
    >
      <View className="flex-col w-full gap-2">
        <Text
          style={{ color: theme.text }}
          className="px-4 text-lg font-medium"
        >
          Настройки
        </Text>
        <Plug />
      </View>
    </View>
  );
}
