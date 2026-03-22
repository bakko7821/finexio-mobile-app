import SettingsHeader from "@/components/UI/headers/SettingsHeader";
import { useTheme } from "@/hooks/useTheme";
import { View } from "react-native";

export default function PersonalizeScreen() {
  const theme = useTheme();

  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="flex-1 flex-col gap-2 items-start justify-start relative"
    >
      <SettingsHeader title="Персонализация" />
      {/* <Text
        style={{ color: theme.secondary }}
        className="text-sn font-medium px-4"
      >
        Страница находится в разработке.
      </Text> */}
      <View className="w-full flex-1 bg-red-300 flex-col gap-2">
        <View></View>
      </View>
    </View>
  );
}
