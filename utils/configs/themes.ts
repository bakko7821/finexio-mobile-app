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

  darkCherry: {
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
  darkCherry: { name: "Dark Cherry", isDark: true },
};

export type ThemeOption = {
  id: ThemeMode;
  name: string;
  preview: {
    background: string;
    card: string;
    text: string;
  };
  isDark: boolean;
};

const themeIds = Object.keys(themes) as ThemeId[];

export const themeOptions: ThemeOption[] = [
  {
    id: "system",
    name: "System",
    preview: {
      background: "#8E8E93",
      card: "#C7C7CC",
      text: "#FFFFFF",
    },
    isDark: false,
  },

  ...themeIds.map((id) => {
    const colors = themes[id];

    return {
      id,
      name: themeInfo[id].name,
      preview: {
        background: colors.background,
        card: colors.card,
        text: colors.text,
      },
      isDark: themeInfo[id].isDark,
    };
  }),
];
