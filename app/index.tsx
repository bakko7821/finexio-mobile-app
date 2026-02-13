import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import "../global.css";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(tabs)/categories");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Загрузка модулей...
      </Text>
    </View>
  );
}
