import { getDB } from "@/db";
import { runMigrations } from "@/db/migrations";
import "@/global.css";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect } from "react";

export default function Index() {
  useEffect(() => {
    (async () => {
      try {
        const db = await getDB();
        await runMigrations(db);
        console.log("DB initialized");
      } catch (e) {
        console.error("DB init error", e);
      }
    })();
  }, []);

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      router.replace("/category");
    }, [router]),
  );

  return null;
}
