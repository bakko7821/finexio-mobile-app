import { getAllSettings, setSetting } from "@/database/queries/settings";
import { defaultSettings, ThemeType } from "@/utils/constants/settings";
import { Appearance } from "react-native";
import { create } from "zustand";

type SettingsState = {
  theme: ThemeType;
  primaryColor: string;

  resolvedTheme: "light" | "dark"; // 💥 важно

  load: () => Promise<void>;
  setTheme: (theme: ThemeType) => Promise<void>;
  setPrimaryColor: (color: string) => Promise<void>;
};

export const useSettings = create<SettingsState>((set, get) => ({
  ...defaultSettings,

  resolvedTheme: Appearance.getColorScheme() === "dark" ? "dark" : "light",

  load: async () => {
    const dbSettings = await getAllSettings();

    const merged = {
      ...defaultSettings,
      ...dbSettings,
    };

    const systemTheme =
      Appearance.getColorScheme() === "dark" ? "dark" : "light";

    set({
      ...merged,
      resolvedTheme: merged.theme === "system" ? systemTheme : merged.theme,
    });
  },

  setTheme: async (theme) => {
    await setSetting("theme", theme);

    const systemTheme =
      Appearance.getColorScheme() === "dark" ? "dark" : "light";

    set({
      theme,
      resolvedTheme: theme === "system" ? systemTheme : theme,
    });
  },

  setPrimaryColor: async (primaryColor) => {
    await setSetting("primaryColor", primaryColor);
    set({ primaryColor });
  },
}));
