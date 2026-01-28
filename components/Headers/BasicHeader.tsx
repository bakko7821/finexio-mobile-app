import "@/global.css";
import React from "react";
import { Text, View } from "react-native";

export default function BasicHeader() {
  return (
    <View className="overflow-hidden w-full flex flex-row items-center justify-between bg-gray-400 p-4 pt-10 rounded-b-3xl">
      <Text className="text-sm">Январь 28</Text>
      <Text className="text-sm font-medium">13.976 ₽</Text>
    </View>
  );
}
