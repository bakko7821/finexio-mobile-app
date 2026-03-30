import { getAllSettings, setSetting } from "@/database/queries/settings";
import { defaultSettings } from "@/utils/constants/settings";
import { ThemeId, ThemeMode, themes } from "@/utils/configs/themes";
import { Appearance } from "react-native";
import { create } from "zustand";

type SettingsState = {
  theme: ThemeMode;
  primaryColor: string;
  resolvedTheme: ThemeId;

  load: () => Promise<void>;
  setTheme: (theme: ThemeMode) => Promise<void>;
  setPrimaryColor: (color: string) => Promise<void>;
};

const getSystemResolvedTheme = (): ThemeId => {
  return Appearance.getColorScheme() === "dark" ? "dark" : "light";
};

const isThemeMode = (value: string): value is ThemeMode => {
  if (value === "system") return true;
  return value in themes;
};

const resolveTheme = (theme: ThemeMode): ThemeId => {
  if (theme === "system") return getSystemResolvedTheme();
  return theme in themes ? (theme as ThemeId) : "light";
};

export const useSettings = create<SettingsState>((set) => ({
  ...defaultSettings,
  resolvedTheme: getSystemResolvedTheme(),

  load: async () => {
    const dbSettings = await getAllSettings();

    const rawTheme = dbSettings.theme;
    const safeTheme =
      typeof rawTheme === "string" && isThemeMode(rawTheme)
        ? rawTheme
        : defaultSettings.theme;

    const merged = {
      ...defaultSettings,
      ...dbSettings,
      theme: safeTheme,
    };

    set({
      ...merged,
      resolvedTheme: resolveTheme(merged.theme),
    });
  },

  setTheme: async (theme) => {
    await setSetting("theme", theme);

    set({
      theme,
      resolvedTheme: resolveTheme(theme),
    });
  },

  setPrimaryColor: async (primaryColor) => {
    await setSetting("primaryColor", primaryColor);
    set({ primaryColor });
  },
}));
