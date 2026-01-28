import { usePathname, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Nav() {
  const router = useRouter();
  const pathname = usePathname(); // текущий путь

  return (
    <View className="w-full flex flex-row items-center justify-between bg-gray-400 p-4 rounded-t-3xl">
      <TouchableOpacity>
        <Text>Меню</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/wallet")}>
        <Text>Кошелек</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/category")}>
        <Text>Категории</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/category")}>
        <Text>Операции</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/category")}>
        <Text>Обзор</Text>
      </TouchableOpacity>
    </View>
  );
}
