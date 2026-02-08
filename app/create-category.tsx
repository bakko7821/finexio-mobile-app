import AddIcon from "@/assets/ui/plus-large-svgrepo-com.svg";
import { SmallCategoriesList } from "@/components/category/SmallCategoriesList";
import CreateCategoryHeader from "@/components/Headers/CreateCategoryHeader";
import CreateSmallCategoryModal from "@/components/Modals/CreateSmallCategoryModal";
import Plug from "@/components/UI/Plug";
import { useTheme } from "@/hooks/useTheme";
import { useSearchParams } from "expo-router/build/hooks";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function CreateCategoryScreen() {
  const theme = useTheme();
  const params = useSearchParams();

  const selectedColor = params.get("selectedColor") || "#ff0000";
  const selectedIcon = params.get("selectedIcon") || "burger";

  const [isOpenCreateSmallCategoryModal, setIsOpenCreateSmallCategoryModal] =
    useState(false);

  const [smallCategories, setSmallCategories] = useState<
    { name: string; color: string }[]
  >([]);

  const createSmallCategory = (name: string) => {
    if (!name.trim()) return;

    setSmallCategories((prev) => {
      if (prev.some((c) => c.name === name)) return prev;
      return [...prev, { name, color: selectedColor }];
    });
  };

  const deleteSmallCategory = (name: string) => {
    setSmallCategories((prev) => prev.filter((item) => item.name !== name));
  };

  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="w-full h-full flex-1"
    >
      <CreateCategoryHeader
        selectedColor={selectedColor}
        selectedIcon={selectedIcon}
        smallCategories={smallCategories}
      />
      <View style={{ zIndex: 1 }} className="w-full flex-1 flex-col gap-2 pt-3">
        <View className="w-full flex-col gap-2 items-start justify-start">
          <View className="p-3 w-full flex-row items-center justify-between">
            <Text
              style={{ color: theme.primary }}
              className="text-lg font-semibold"
            >
              Подкатегории
            </Text>
            <Text
              style={{ color: theme.secondary }}
              className="text-sm font-medium"
            >
              {smallCategories.length}
            </Text>
          </View>
          <Plug />
          {smallCategories.length > 0 ? (
            <View className="flex-col w-full items-start justify-start gap-2">
              <Text
                style={{ color: theme.secondary }}
                className="px-3 text-sm font-medium"
              >
                Для удаления подкатегории свайпните её влево.
              </Text>
              <SmallCategoriesList
                smallCategories={smallCategories}
                onDelete={deleteSmallCategory}
              />
            </View>
          ) : (
            <Text
              style={{ color: theme.secondary }}
              className="px-3 text-sm font-medium"
            >
              У вас отстуствуют подкатегории.
            </Text>
          )}
          <TouchableOpacity
            style={{ backgroundColor: theme.card }}
            className="w-full p-3 flex-row gap-2"
            onPress={() => setIsOpenCreateSmallCategoryModal(true)}
          >
            <AddIcon width={24} height={24} color={theme.secondary} />
            <Text
              style={{ color: theme.secondary }}
              className="text-base font-medium"
            >
              Создать новую подкатегорию
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <CreateSmallCategoryModal
        visible={isOpenCreateSmallCategoryModal}
        onClose={() => setIsOpenCreateSmallCategoryModal(false)}
        selectedColor={selectedColor}
        handleDone={createSmallCategory}
      />
    </View>
  );
}
