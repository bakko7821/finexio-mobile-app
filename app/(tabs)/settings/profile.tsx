import SettingsHeader from "@/components/UI/headers/SettingsHeader";
import { useTheme } from "@/hooks/useTheme";
import { Text, View } from "react-native";

export default function ProfileScreen() {
  const theme = useTheme();
  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="flex-1 flex-col gap-2 items-start justify-start relative"
    >
      <SettingsHeader title="Профиль" />
      <Text>Profile Screen</Text>
    </View>
  );
}
