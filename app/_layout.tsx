import { DatabaseProvider } from "@/database/DatabaseProvider";
import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <DatabaseProvider>
      <Stack initialRouteName="(tabs)">
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </DatabaseProvider>
  );
}
