import { useTheme } from "@/hooks/useTheme";
import { TouchableOpacity, View } from "react-native";

export default function CustomGraph() {
  const theme = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{ backgroundColor: theme.card }}
      className="flex-1 w-full relative"
    >
      <TouchableOpacity className="absolutebg-red-900 rounded-full p-2 items-center justify-center">
        <View className="w-10 h-10 bg-white"></View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
