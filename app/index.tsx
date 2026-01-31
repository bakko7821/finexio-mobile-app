import { initDatabase} from "@/db/migrations";
import "@/global.css";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect } from "react";

export default function Index() {
  useEffect(() => {
    (async () => {
      await initDatabase();
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
