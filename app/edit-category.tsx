import TrashIcon from "@/assets/ui/TrashAltSolid.svg";
import CategoryComponent from "@/components/category/CategoryComponent";
import NavHeader from "@/components/Headers/NavHeader";
import ColorsModal from "@/components/Modals/ColorsModal";
import DeleteModal from "@/components/Modals/DeleteModal";
import IconsModal from "@/components/Modals/IconsModal";
import { RenderIcon } from "@/components/UI/RenderIcon";
import { deleteCategory } from "@/db/categories";
import { useTheme } from "@/hooks/useTheme";
import { getContrastColor } from "@/utils/color";
import { Category } from "@/utils/types/categories";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function EditCategoriesScreen() {
  const theme = useTheme();

  const { category } = useLocalSearchParams<{ category?: string }>();

  const parsedCategory: Category | null = category
    ? JSON.parse(category)
    : null;

  const [isOpenIconsModal, setIsOpenIconsModal] = useState(false);
  const [isOpenColorsModal, setIsOpenColorsModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const [categoryNameValue, setCategoryNameValue] = useState(
    parsedCategory?.name ?? "",
  );
  const [selectedIconName, setSelectedIconName] = useState(
    parsedCategory?.icon ?? "burger",
  );
  const [selectedColor, setSelectedColor] = useState(
    parsedCategory?.color ?? "#ff0000",
  );

  if (!parsedCategory) return null;

  const handleDoneEditFunction = () => {
    alert("123");
  };

  const handleDeleteCategory = async (id: number) => {
    if (!id) return;

    try {
      await deleteCategory(id);
      
      router.back();
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="w-full h-full items-center justify-start"
    >
      <NavHeader
        title="Редактирование категории"
        isSave
        handleDone={handleDoneEditFunction}
      />
      <View
        style={{ backgroundColor: theme.header }}
        className="w-full p-3 pt-0 flex-col items-start justify-start"
      >
        <CategoryComponent category={parsedCategory} fullsize />
      </View>
      <View className="p-3 flex-col gap-2 w-full flex-1">
        <View className="flex-col gap-1 w-full items-start justify-start">
          <Text
            style={{ color: theme.secondary }}
            className="text-sm font-medium"
          >
            Название категории:
          </Text>
          <TextInput
            style={{
              color: theme.text,
              borderColor: theme.secondary,
            }}
            placeholderTextColor={theme.secondary}
            className="w-full border border-solid rounded-lg px-2"
            value={categoryNameValue}
            placeholder='"Еда"'
            onChange={(e) => setCategoryNameValue(e.nativeEvent.text)}
          />
        </View>
        <View className="flex-row w-full items-center justify-between">
          <Text
            style={{ color: theme.secondary }}
            className="text-sm font-medium"
          >
            Иконка:
          </Text>
          <TouchableOpacity
            style={{
              borderColor: theme.secondary,
            }}
            className="p-2 border border-solid rounded-lg"
            onPress={() => setIsOpenIconsModal(true)}
          >
            <RenderIcon
              name={selectedIconName}
              width={24}
              height={24}
              color={getContrastColor(theme.background)}
            />
          </TouchableOpacity>
        </View>
        <View className="flex-row w-full items-center justify-between">
          <Text
            style={{ color: theme.secondary }}
            className="text-sm font-medium"
          >
            Цвет:
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: selectedColor,
            }}
            className="p-2 w-[40px] h-[40px] rounded-lg"
            onPress={() => setIsOpenColorsModal(true)}
          ></TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ backgroundColor: "#780000" }}
          className="flex-row p-2 mt-[8px] rounded-xl gap-1 w-full items-center justify-center"
          onPress={() => setIsOpenDeleteModal(true)}
        >
          <TrashIcon
            width={24}
            height={24}
            color={getContrastColor("#780000")}
          />
          <Text
            style={{ color: getContrastColor("#78000") }}
            className="text-base font-medium"
          >
            Удалить категорию
          </Text>
        </TouchableOpacity>
      </View>
      {isOpenIconsModal && (
        <IconsModal
          visible={isOpenIconsModal}
          onClose={() => setIsOpenIconsModal(false)}
          selectedIcon={selectedIconName}
          onSelect={setSelectedIconName}
        />
      )}
      {isOpenColorsModal && (
        <ColorsModal
          visible={isOpenColorsModal}
          onClose={() => setIsOpenColorsModal(false)}
          selectedColor={selectedColor}
          onSelect={setSelectedColor}
        />
      )}
      {isOpenDeleteModal && (
        <DeleteModal
          item="категорию"
          visible={isOpenDeleteModal}
          onClose={() => setIsOpenDeleteModal(false)}
          handleDone={() => handleDeleteCategory(parsedCategory.id)}
        />
      )}
    </View>
  );
}
