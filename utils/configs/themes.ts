import { darkColors, lightColors } from "@/utils/colors";

export const themes = {
  light: lightColors,
  dark: darkColors,

  sandbox: {
    background: "#F6EFD9",
    header: "#E9D8A6",
    card: "#FAF3DD",
    text: "#3D2C1E",
  },

  "dark-cherry": {
    background: "#160A10",
    header: "#2A111B",
    card: "#3A1624",
    text: "#FFEAF1",
  },
} as const;

export type ThemeId = keyof typeof themes;
export type ThemeMode = "system" | ThemeId;

export const themeInfo: Record<
  ThemeId,
  {
    name: string;
    isDark: boolean;
  }
> = {
  light: { name: "Light", isDark: false },
  dark: { name: "Dark", isDark: true },
  sandbox: { name: "Sandbox", isDark: false },
  "dark-cherry": { name: "Dark Cherry", isDark: true },
};

export const themeOptions = [
  {
    id: "system" as const,
    name: "System",
    preview: "#8E8E93",
    isDark: false,
  },
  ...Object.entries(themes).map(([id, colors]) => ({
    id: id as ThemeId,
    name: themeInfo[id as ThemeId].name,
    preview: colors.background,
    isDark: themeInfo[id as ThemeId].isDark,
  })),
];
