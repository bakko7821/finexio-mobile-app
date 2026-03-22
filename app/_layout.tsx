import { DatabaseProvider } from "@/database/DatabaseProvider";
import { ProgressProvider } from "@/providers/ProgressProvider";
import Constants from "expo-constants";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "../global.css";
import { useSystemThemeSync } from "@/hooks/useSystemThemeSync";

if (Constants.executionEnvironment !== "storeClient") {
  SplashScreen.preventAutoHideAsync();
}

export default function RootLayout() {
  useSystemThemeSync();

  return (
    <ProgressProvider>
      <DatabaseProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </DatabaseProvider>
    </ProgressProvider>
  );
}
