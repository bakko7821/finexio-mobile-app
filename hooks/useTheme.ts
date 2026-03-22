import { useSettings } from "@/store/useSettings";
import { constantColors, darkColors, lightColors } from "@/utils/colors";
import { useColorScheme } from "react-native";

export const useTheme = () => {
  const { theme, primaryColor } = useSettings();
  const system = useColorScheme();

  const finalTheme =
    theme === "system" ? (system === "dark" ? "dark" : "light") : theme;

  const isDark = finalTheme === "dark";

  const base = isDark ? darkColors : lightColors;

  return {
    ...base,
    ...constantColors,
    primary: primaryColor,
    isDark,
  };
};
