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

export const colorsArray = [
  // RED
  { color: "#ff0000" },
  { color: "#ff0f0f" },
  { color: "#ff1e1e" },
  { color: "#ff2d2d" },
  { color: "#ff3c3c" },
  { color: "#ff4b4b" },

  { color: "#d22d2d" },
  { color: "#cb3535" },
  { color: "#c33c3c" },
  { color: "#bc4444" },
  { color: "#b44b4b" },
  { color: "#ad5353" },

  { color: "#a50000" },
  { color: "#960000" },
  { color: "#870000" },
  { color: "#780000" },
  { color: "#690000" },
  { color: "#5a0000" },

  // ORANGE
  { color: "#ff6600" },
  { color: "#ff6f0f" },
  { color: "#ff781e" },
  { color: "#ff812d" },
  { color: "#ff8a3c" },
  { color: "#ff934b" },

  { color: "#d26f2d" },
  { color: "#cb7135" },
  { color: "#c3723c" },
  { color: "#bc7444" },
  { color: "#b4754b" },
  { color: "#ad7753" },

  { color: "#a54200" },
  { color: "#963c00" },
  { color: "#873600" },
  { color: "#783000" },
  { color: "#692a00" },
  { color: "#5a2400" },

  // YELLOW
  { color: "#ffdd00" },
  { color: "#ffe11e" },
  { color: "#ffe53c" },
  { color: "#ffe95a" },
  { color: "#ffed78" },
  { color: "#fff196" },

  { color: "#d2bc2d" },
  { color: "#cbb735" },
  { color: "#c3b13c" },
  { color: "#bcac44" },
  { color: "#b4a64b" },
  { color: "#ada153" },

  { color: "#a58f00" },
  { color: "#968200" },
  { color: "#877500" },
  { color: "#786800" },
  { color: "#695b00" },
  { color: "#5a4e00" },

  // GREEN
  { color: "#4dff00" },
  { color: "#62ff1e" },
  { color: "#77ff3c" },
  { color: "#8cff5a" },
  { color: "#a1ff78" },
  { color: "#b6ff96" },

  { color: "#5fd22d" },
  { color: "#62cb35" },
  { color: "#65c33c" },
  { color: "#68bc44" },
  { color: "#6bb44b" },
  { color: "#6ead53" },

  { color: "#32a500" },
  { color: "#2d9600" },
  { color: "#298700" },
  { color: "#247800" },
  { color: "#206900" },
  { color: "#1b5a00" },

  // SKY
  { color: "#00eeff" },
  { color: "#1ef0ff" },
  { color: "#3cf2ff" },
  { color: "#5af4ff" },
  { color: "#78f6ff" },
  { color: "#96f8ff" },

  { color: "#2dc7d2" },
  { color: "#35c1cb" },
  { color: "#3cbac3" },
  { color: "#44b4bc" },
  { color: "#4badb4" },
  { color: "#53a7ad" },

  { color: "#009aa5" },
  { color: "#008c96" },
  { color: "#007e87" },
  { color: "#007078" },
  { color: "#006269" },
  { color: "#00545a" },
];