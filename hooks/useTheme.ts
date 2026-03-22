// hooks/useTheme.ts
import { useSettings } from "@/store/useSettings";
import { lightColors, darkColors, constantColors } from "@/utils/colors";

export const useTheme = () => {
  const { theme, primaryColor } = useSettings();

  const base = theme === "dark" ? darkColors : lightColors;

  return {
    ...base,
    ...constantColors,
    primary: primaryColor,
  };
};
