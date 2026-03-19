import { DatabaseProvider } from "@/database/DatabaseProvider";
import { ProgressProvider } from "@/providers/ProgressProvider";
import Constants from "expo-constants";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "../global.css";

if (Constants.executionEnvironment !== "storeClient") {
  SplashScreen.preventAutoHideAsync();
}

export default function RootLayout() {
  return (
    <ProgressProvider>
      <DatabaseProvider>
        {/* <Loader /> */}
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </DatabaseProvider>
    </ProgressProvider>
  );
}
