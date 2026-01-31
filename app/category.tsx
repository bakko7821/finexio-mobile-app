import BasicHeader from "@/components/Headers/BasicHeader";
import Nav from "@/components/Nav";
import Plug from "@/components/UI/Plug";
import { getCategoriesByType } from "@/db/categories";
import "@/global.css";
import { useTheme } from "@/hooks/useTheme";
import { getContrastColor } from "@/utils/color";
import { Category } from "@/utils/types/categories";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MoreIcon from "../assets/icons/more-horizontal-svgrepo-com.svg";
import PlusIcon from "../assets/icons/plus-large-svgrepo-com.svg";

export default function CategoryScreen() {
  const type = 1;
  const router = useRouter();
  const theme = useTheme();

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    let mounted = true;

    const loadCategories = async () => {
      try {
        const data = await getCategoriesByType(type);
        if (mounted) {
          setCategories(data);
        }
      } catch (e) {
        console.error("Ошибка загрузки категорий", e);
      }
    };

    loadCategories();

    return () => {
      mounted = false;
    };
  }, [type]);

  useFocusEffect(
    useCallback(() => {
      getCategoriesByType(type).then(setCategories);
    }, [type]),
  );

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
          <View className="w-full flex-row items-start px-2 py-1 gap-3">
            <TouchableOpacity
              style={{
                backgroundColor: "#CCCCCC",
                borderColor: theme.secondary,
              }}
              className="flex items-center justify-center border-dashed border p-1 rounded-full"
              onPress={() => router.push("/create-category")}
            >
              <PlusIcon width={32} height={32} color={theme.secondary} />
            </TouchableOpacity>
            <View className="flex-1 flex-wrap flex-row gap-1">
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.name}
                  className="p-1 rounded-lg flex-row gap-1 items-center justify-start"
                  style={{
                    backgroundColor: category.color || theme.secondary,
                  }}
                >
                  <Text
                    className="text-base font-medium"
                    style={{ color: getContrastColor(category.color) }}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
      <Nav />
    </View>
  );
}
