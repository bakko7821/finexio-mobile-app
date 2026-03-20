import SettingsHeader from "@/components/SettingsHeader";
import { useTheme } from "@/hooks/useTheme";
import { Text, View } from "react-native";

export default function NotificationsScreen() {
  const theme = useTheme();

  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="flex-1 flex-col gap-2 items-start justify-start relative"
    >
      <SettingsHeader />
      <Text>Notifications Screen</Text>
    </View>
  );
}
