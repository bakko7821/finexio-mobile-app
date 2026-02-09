import { constantColors, darkColors, lightColors } from "@/utils/colors";
import { useColorScheme } from "react-native";

export type Theme = typeof lightColors & typeof constantColors;

export const useTheme = (): Theme & { isDark: boolean } => {
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "dark" ? darkColors : lightColors;

  return {
    ...themeColors,
    ...constantColors,
    isDark: colorScheme === "dark",
  };
};