import BasicHeader from "@/components/Headers/BasicHeader";
import Nav from "@/components/Nav";
import Plug from "@/components/UI/Plug";
import { getCategoriesByType } from "@/db/repos/categoryRepo";
import "@/global.css";
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MoreIcon from "../assets/icons/more-horizontal-svgrepo-com.svg";
import PlusIcon from "../assets/icons/plus-large-svgrepo-com.svg";

export interface Category {
  name: string;
  icon?: string;
  color?: string;
  type: number;
}

export default function CategoryScreen() {
  const router = useRouter();
  const theme = useTheme();

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const data = await getCategoriesByType(1);
      setCategories(data);
    }

    fetchCategories();
  });

  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="w-full h-full items-center justify-between"
    >
      <BasicHeader />
      <View className="flex-1 w-full flex-col p-3 gap-3">
        <View className="flex-col gap-1 w-full">
          <View>
            <View className="px-2 flex-col items-start w-full">
              <Text
                style={{ color: theme.text }}
                className="text-sm font-medium"
              >
                График
              </Text>
              <Text
                style={{ color: theme.secondary }}
                className="text-xs font-regular"
              >
                Чтобы указать доходы, нажмите в центр графика.
              </Text>
            </View>
          </View>
          {/* график */}
        </View>
        <Plug />
        <View className="flex-col gap-1 w-full">
          <View className="px-2 flex-row items-center justify-between w-full">
            <Text style={{ color: theme.text }} className="text-sm font-medium">
              Расходы
            </Text>
            <Text className="color-red-800 text-sm font-medium">-85.127 ₽</Text>
          </View>
          {/* мини-график */}
        </View>
        <Plug />
        <View className="w-full flex-col gap-1">
          <View className="px-2 flex-row items-center justify-between w-full">
            <Text style={{ color: theme.text }} className="text-sm font-medium">
              Категории
            </Text>
            <TouchableOpacity>
              <MoreIcon width={24} height={24} color={theme.secondary} />
            </TouchableOpacity>
          </View>
          <View className="w-full flex-row px-2 py-1 gap-3">
            <TouchableOpacity
              style={{
                backgroundColor: "#CCCCCC",
                borderColor: theme.secondary,
              }}
              className="border-dashed border p-1 rounded-full"
              onPress={() => router.push("/create-category")}
            >
              <PlusIcon width={32} height={32} color={theme.secondary} />
            </TouchableOpacity>
            <View>
              {categories.map((category) => (
                <View
                  key={category.name} // обязательно ключ для map
                  style={{
                    padding: 8,
                    marginVertical: 4,
                    backgroundColor: category.color || "#eee",
                    borderRadius: 8,
                  }}
                >
                  <Text style={{ fontSize: 16, color: "#000" }}>
                    {category.name} ({category.type === 1 ? "Доход" : "Расход"})
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
      <Nav />
    </View>
  );
}
