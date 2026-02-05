import { getSeason, Season } from "@/utils/season";
import { useColorScheme } from "react-native";

export const lightTheme = {
  background: "#FFFFFF",
  header: "#D9D9D9",
  card: "#F3F4F6",
  text: "#1A1A1A",
  primary: "#004299",
  secondary: "#999999",
  red: "#b40000",
  green: "#27b400",
  seasonColors: {
    winter: "#009DFF",
    spring: "#2A6900",
    summer: "#FFF700",
    autumn: "#FFBB00",
  },
};

export const darkTheme = {
  background: "#1a1a1a",
  header: "#353535",
  card: "#424242",
  text: "#ffffff",
  primary: "#3B82F6",
  secondary: "#999999",
  red: "#b40000",
  green: "#27b400",
  seasonColors: {
    winter: "#009DFF",
    spring: "#2A6900",
    summer: "#FFF700",
    autumn: "#FFBB00",
  },
};

export type Theme = typeof lightTheme;

export const useTheme = (): Theme & { seasonColor: string; season: Season } => {
  const colorScheme = useColorScheme(); // 'light' | 'dark' | null
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  const season = getSeason(); // текущий сезон
  const seasonColor = theme.seasonColors[season];

  return { ...theme, seasonColor, season };
};
