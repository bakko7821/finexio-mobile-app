import { useTheme } from "@/hooks/useTheme";
import { Text, View } from "react-native";

export default function ChartScreen() {
  const theme = useTheme();
  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="flex-1 items-center justify-center"
    >
      <Text className="text-xl font-bold text-red-500">IN DEV</Text>
    </View>
  );
}
