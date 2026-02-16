import { initOnce } from "@/database";
import { DatabaseProvider } from "@/database/DatabaseProvider";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";

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
