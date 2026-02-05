import { useColorScheme } from "react-native";

const constantColors = {
  primary: "#3197D7",
  secondary: "#9C9C9C",
  secondary2: "#E0E5EB",
  red: "#b40000",
  green: "#27b400",
};

const lightColors = {
  background: "#FFFFFF",
  header: "#E0E5EB",
  card: "#F0F1F5",
  text: "#0A0F15",
};

const darkColors = {
  background: "#0A0F15",
  header: "#373E4E",
  card: "#222631",
  text: "#ffffff",
};

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
