import { useSettings } from "@/store/useSettings";
import { constantColors } from "@/utils/colors";
import { themes } from "@/utils/configs/themes";

export const useTheme = () => {
  const { resolvedTheme, primaryColor } = useSettings();

  const base = themes[resolvedTheme];
  const isDark = resolvedTheme === "dark" || resolvedTheme === "dark-cherry";

  return {
    ...base,
    ...constantColors,
    primary: primaryColor,
    isDark,
    themeId: resolvedTheme,
  };
};
