import { getAllSettings, setSetting } from "@/database/queries/settings";
import { ThemeId, ThemeMode, themes } from "@/utils/configs/themes";
import { defaultSettings } from "@/utils/constants/settings";
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
  const system = Appearance.getColorScheme();

  return system === "dark" ? "dark" : "light";
};

const resolveTheme = (theme: ThemeMode): ThemeId => {
  if (theme === "system") return getSystemResolvedTheme();

  if (theme in themes) return theme as ThemeId;

  return "light";
};

export const useSettings = create<SettingsState>((set) => ({
  ...defaultSettings,

  resolvedTheme: getSystemResolvedTheme(),

  load: async () => {
    const dbSettings = await getAllSettings();

    const merged = {
      ...defaultSettings,
      ...dbSettings,
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
