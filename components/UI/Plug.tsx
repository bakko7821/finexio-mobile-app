import { useTheme } from "@/hooks/useTheme";
import { View } from "react-native";

export default function Plug() {
  const theme = useTheme();

  return (
    <View
      style={{ backgroundColor: theme.secondary }}
      className="w-full h-[2px]"
    ></View>
  );
}
