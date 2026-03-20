import { DatabaseProvider } from "@/database/DatabaseProvider";
import { useTheme } from "@/hooks/useTheme";
import { ProgressProvider } from "@/providers/ProgressProvider";
import Constants from "expo-constants";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "../global.css";

if (Constants.executionEnvironment !== "storeClient") {
  SplashScreen.preventAutoHideAsync();
}

export default function RootLayout() {
  const theme = useTheme();

  return (
    <ProgressProvider>
      <DatabaseProvider>
        {/* <Loader /> */}
        <Stack
          screenOptions={{
            contentStyle: {
              backgroundColor: theme.background,
            },
            animation: "slide_from_left",
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </DatabaseProvider>
    </ProgressProvider>
  );
}
