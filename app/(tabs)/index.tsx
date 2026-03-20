import { useTheme } from "@/hooks/useTheme";
import { Redirect } from "expo-router";
import { View } from "react-native";

export default function TabsIndex() {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Redirect href="/categories" />
    </View>
  );
}
