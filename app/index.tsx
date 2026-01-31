import "@/global.css";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";

export default function Index() {
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      router.replace("/category");
    }, [router]),
  );

  return null;
}
