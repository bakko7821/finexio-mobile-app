import { useEffect } from "react";
import { Appearance } from "react-native";
import { useSettings } from "@/store/useSettings";

export const useSystemThemeSync = () => {
  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      const { theme } = useSettings.getState();

      if (theme !== "system") return;

      useSettings.setState({
        resolvedTheme: colorScheme === "dark" ? "dark" : "light",
      });
    });

    return () => sub.remove();
  }, []);
};
