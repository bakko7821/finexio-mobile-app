import BasicHeader from "@/components/Headers/BasicHeader";
import Nav from "@/components/Nav";
import "@/global.css";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MoreIcon from "../assets/icons/more-horizontal-svgrepo-com.svg";
import PlusIcon from "../assets/icons/plus-large-svgrepo-com.svg";

export default function CategoryScreen() {
  return (
    <View className="w-full h-full items-center justify-between">
      <BasicHeader />
      <View className="flex-1 w-full flex-col p-3 gap-3">
        <View className="flex-col gap-1 w-full">
          <View>
            <View className="px-2 flex-col items-start w-full">
              <Text className="text-sm font-medium">График</Text>
              <Text className="color-gray-500 text-xs font-regular">
                Чтобы указать доходы, нажмите в центр графика.
              </Text>
            </View>
          </View>
          {/* график */}
        </View>
        <View className="w-full h-[2px] bg-gray-400 rounded-xl"></View>
        <View className="flex-col gap-1 w-full">
          <View className="px-2 flex-row items-center justify-between w-full">
            <Text className="text-sm font-medium">Расходы</Text>
            <Text className="color-red-500 text-sm font-medium">-85.127 ₽</Text>
          </View>
          {/* мини-график */}
        </View>
        <View className="w-full h-[2px] bg-gray-400 rounded-xl"></View>
        <View className="w-full flex-col gap-1">
          <View className="px-2 flex-row items-center justify-between w-full">
            <Text className="text-sm font-medium">Категории</Text>
            <TouchableOpacity>
              <MoreIcon width={24} height={24} color={"#9c9c9c"} />
            </TouchableOpacity>
          </View>
          <View className="w-full flex-row px-2 py-1 gap-3">
            <TouchableOpacity
              style={{ backgroundColor: "#CCCCCC" }}
              className="border-dashed border border-gray-400 p-1 rounded-full"
            >
              <PlusIcon width={32} height={32} color={"#9C9C9C"} />
            </TouchableOpacity>
            <View>{/* компонент категорий */}</View>
          </View>
        </View>
      </View>
      <Nav />
    </View>
  );
}
