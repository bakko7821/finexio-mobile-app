import { getAllSettings, setSetting } from "@/database/queries/settings";
import { defaultSettings } from "@/utils/constants/settings";
import { create } from "zustand";

type SettingsState = {
  theme: "light" | "dark";
  primaryColor: string;

  load: () => Promise<void>;
  setTheme: (theme: "light" | "dark") => Promise<void>;
  setPrimaryColor: (color: string) => Promise<void>;
};

export const useSettings = create<SettingsState>((set) => ({
  ...defaultSettings,

  load: async () => {
    const dbSettings = await getAllSettings();

    set({
      ...defaultSettings,
      ...dbSettings,
    });
  },

  setTheme: async (theme) => {
    await setSetting("theme", theme);
    set({ theme });
  },

  setPrimaryColor: async (primaryColor) => {
    await setSetting("primaryColor", primaryColor);
    set({ primaryColor });
  },
}));
