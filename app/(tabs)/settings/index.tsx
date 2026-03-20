import Header from "@/components/UI/headers/Header";
import { useTheme } from "@/hooks/useTheme";
import { usePathname, useRouter } from "expo-router";
import { View } from "react-native";

export default function SettingsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="flex-1 flex-col gap-2 items-start justify-start relative"
    >
      <Header title={"Настройки"} />
      <View className="flex-1 bg-red-300 w-full px-4"></View>
    </View>
  );
}
