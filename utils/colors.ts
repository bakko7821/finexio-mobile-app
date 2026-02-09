export const constantColors = {
  primary: "#9d4ae2",
  secondary: "#9C9C9C",
  secondary2: "#E0E5EB",
  red: "#b40000",
  green: "#27b400",
};

export const lightColors = {
  background: "#FFFFFF",
  header: "#E0E5EB",
  card: "#F0F1F5",
  text: "#0A0F15",
};

export const darkColors = {
  background: "#0A0F15",
  header: "#373E4E",
  card: "#222631",
  text: "#ffffff",
};

export function getContrastColor(hex: string): "#0A0F15" | "#FFFFFF" {
  const cleanHex = hex.replace("#", "");

  const fullHex =
    cleanHex.length === 3
      ? cleanHex
          .split("")
          .map((c) => c + c)
          .join("")
      : cleanHex;

  const r = parseInt(fullHex.substring(0, 2), 16);
  const g = parseInt(fullHex.substring(2, 4), 16);
  const b = parseInt(fullHex.substring(4, 6), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? "#0A0F15" : "#FFFFFF";
}

export function withOpacity(hex: string, opacity: number): string {
  if (!hex || opacity < 0 || opacity > 1) {
    return hex;
  }

  let cleanedHex = hex.replace("#", "");

  if (cleanedHex.length === 3) {
    cleanedHex = cleanedHex
      .split("")
      .map((c) => c + c)
      .join("");
  }

  if (cleanedHex.length !== 6) {
    return hex;
  }

  const r = parseInt(cleanedHex.slice(0, 2), 16);
  const g = parseInt(cleanedHex.slice(2, 4), 16);
  const b = parseInt(cleanedHex.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
