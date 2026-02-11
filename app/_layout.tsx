import { DatabaseProvider } from "@/database/DatabaseProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <DatabaseProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </DatabaseProvider>
  );
}
