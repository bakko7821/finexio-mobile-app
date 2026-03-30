import { darkColors, lightColors } from "@/utils/colors";

export const themes = {
  light: lightColors,
  dark: darkColors,

  darkCherry: {
    background: "#160A10",
    header: "#2A111B",
    card: "#3A1624",
    text: "#FFEAF1",
  },

  midnight: {
    background: "#0B0F1A",
    header: "#12182A",
    card: "#1A2238",
    text: "#E6EDF3",
  },

  ocean: {
    background: "#0A192F",
    header: "#112240",
    card: "#1B2A49",
    text: "#E6F1FF",
  },

  cosmos: {
    background: "#140021",
    header: "#1F0033",
    card: "#2A0047",
    text: "#F3E8FF",
  },

  forest: {
    background: "#0E1A14",
    header: "#16271F",
    card: "#1F3329",
    text: "#E6F4EA",
  },

  sand: {
    background: "#F5EDE3",
    header: "#E8DCCB",
    card: "#DED0BB",
    text: "#2C2A28",
  },

  cloud: {
    background: "#F7F9FC",
    header: "#E9EEF5",
    card: "#DCE3EC",
    text: "#1A1F2B",
  },

  ice: {
    background: "#EAF4F8",
    header: "#D8E9F0",
    card: "#C6DDE6",
    text: "#0F1F2E",
  },

  sunset: {
    background: "#2B0F0F",
    header: "#3A1717",
    card: "#4A2020",
    text: "#FFE9E9",
  },

  slate: {
    background: "#1C1F26",
    header: "#262B34",
    card: "#303744",
    text: "#E5EAF3",
  },

  grape: {
    background: "#1A0F1F",
    header: "#24162B",
    card: "#2F1D38",
    text: "#F1E8FF",
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
  darkCherry: { name: "Dark Cherry", isDark: true },
  midnight: { name: "Midnight", isDark: true },
  ocean: { name: "Ocean", isDark: true },
  cosmos: { name: "Cosmos", isDark: true },
  forest: { name: "Forest", isDark: true },
  sand: { name: "Sand", isDark: false },
  cloud: { name: "Cloud", isDark: false },
  ice: { name: "Ice", isDark: false },
  sunset: { name: "Sunset", isDark: true },
  slate: { name: "Slate", isDark: true },
  grape: { name: "Grape", isDark: true },
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
