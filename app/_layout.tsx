import { DatabaseProvider } from "@/database/DatabaseProvider";
import { useTheme } from "@/hooks/useTheme";
import { ProgressProvider } from "@/providers/ProgressProvider";
import Constants from "expo-constants";
import { Stack, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "../global.css";

if (Constants.executionEnvironment !== "storeClient") {
  SplashScreen.preventAutoHideAsync();
}

export default function RootLayout() {
  const theme = useTheme();
  const pathname = usePathname();

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
