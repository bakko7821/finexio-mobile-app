import { DatabaseProvider } from "@/database/DatabaseProvider";
import { useTheme } from "@/hooks/useTheme";
import { ProgressProvider } from "@/providers/ProgressProvider";
import Constants from "expo-constants";
import { Stack, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "../global.css";
import { useSettings } from "@/store/useSettings";
import { useEffect } from "react";

if (Constants.executionEnvironment !== "storeClient") {
  SplashScreen.preventAutoHideAsync();
}

export default function RootLayout() {
  const theme = useTheme();
  const loadSettings = useSettings((s) => s.load);

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <ProgressProvider>
      <DatabaseProvider>
        <Stack
          screenOptions={{
            contentStyle: {
              backgroundColor: theme.background,
            },
            headerShown: false,
          }}
        />
      </DatabaseProvider>
    </ProgressProvider>
  );
}
