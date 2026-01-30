/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#2563eb",
          background: "#ffffff",
          card: "#f3f4f6",
          text: "#111827",
        },
        dark: {
          primary: "#3b82f6",
          background: "#111827",
          card: "#1f2937",
          text: "#f9fafb",
        },
      },
    },
  },
  plugins: [],
};
