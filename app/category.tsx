import MoreIcon from "@/assets/ui/more-horizontal-svgrepo-com.svg";
import PlusIcon from "@/assets/ui/plus-large-svgrepo-com.svg";
import CategoryIcon from "@/components/category/CategoryIcon";
import BasicHeader from "@/components/Headers/BasicHeader";
import CategoryModal from "@/components/Modals/CategoryModal";
import CategoryModalSmall from "@/components/Modals/CategoryModalSmall";
import Nav from "@/components/Nav";
import Plug from "@/components/UI/Plug";
import { getCategoriesByType } from "@/db/categories";
import "@/global.css";
import { useTheme } from "@/hooks/useTheme";
import { withOpacity } from "@/utils/color";
import { Category } from "@/utils/types/categories";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function CategoryScreen() {
  const type = 1;
  const router = useRouter();
  const theme = useTheme();

  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpenCategoryModal, setIsOpenCategoryModal] = useState(false);
  const [isOpenSmallCategoryModal, setIsOpenSmallCategoryModal] =
    useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  useFocusEffect(
    useCallback(() => {
      let active = true;

      const load = async () => {
        try {
          const data = await getCategoriesByType(type);
          if (active) setCategories(data);
        } catch (e) {
          console.error("Ошибка загрузки категорий", e);
        }
      };

      load();

      return () => {
        active = false;
      };
    }, [type]),
  );

  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="w-full h-full items-center justify-between"
    >
      <BasicHeader type={type} />
      <View className="flex-1 w-full flex-col p-3 gap-3 relative">
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
        <View className="w-full flex-col gap-1">
          <View className="px-2 flex-row items-center justify-between w-full relative">
            <Text style={{ color: theme.text }} className="text-sm font-medium">
              Категории
            </Text>
            <TouchableOpacity
            // onPress={() => setIsOpenCategoryDropDownModal((prev) => !prev)}
            >
              <MoreIcon width={24} height={24} color={theme.secondary} />
            </TouchableOpacity>
            {/* {isOpenCategoryDropDownModal && (
              <DropDownModal
                position={{
                  right: 0,
                  top: 0,
                }}
              />
            )} */}
          </View>
          <View className="w-full flex-col items-start px-2 py-1 gap-3">
            <View className="flex-row flex-wrap gap-2 items-center justify-start">
              {categories.map((category) => (
                <CategoryIcon
                  key={category.id}
                  category={category}
                  onSelect={setSelectedCategory}
                  onOpen={setIsOpenCategoryModal}
                  isOpen={isOpenCategoryModal}
                  isOpenSmallPanel={isOpenSmallCategoryModal}
                  onOpenSmallPanel={setIsOpenSmallCategoryModal}
                />
              ))}
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: withOpacity(theme.secondary, 0.4),
            borderColor: theme.secondary,
            zIndex: 999,
          }}
          className="flex items-center justify-center border-dashed border-[2px] p-1 rounded-full absolute bottom-3 left-3"
          onPress={() => router.push("/create-category")}
        >
          <PlusIcon width={36} height={36} color={theme.secondary} />
        </TouchableOpacity>
      </View>
      <Nav />
      {isOpenCategoryModal && (
        <CategoryModal
          category={selectedCategory}
          visible={isOpenCategoryModal}
          onClose={() => setIsOpenCategoryModal(false)}
          type={type}
        />
      )}
      {isOpenSmallCategoryModal && (
        <CategoryModalSmall
          category={selectedCategory}
          visible={isOpenSmallCategoryModal}
          onClose={() => setIsOpenSmallCategoryModal(false)}
          type={type}
        />
      )}
    </View>
  );
}
