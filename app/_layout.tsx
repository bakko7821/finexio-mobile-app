import { Slot } from "expo-router";
import React, { useEffect } from "react";

import { ensureUserExists, getOrCreateUserId } from "@/db/chart";
import { UserProvider } from "@/hooks/userContext";

export async function initApp() {
  const userId = await getOrCreateUserId();
  await ensureUserExists(userId);

  return userId;
}

export default function RootLayout() {
  useEffect(() => {
    initApp();
    console.log("init");
  }, []);

  return <UserProvider>
    <Slot />
  </UserProvider>
}
