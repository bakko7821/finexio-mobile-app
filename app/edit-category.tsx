import ArchiveIcon from "@/assets/ui/Archive.svg";
import TrashIcon from "@/assets/ui/TrashAltSolid.svg";
import CategoryComponent from "@/components/category/CategoryComponent";
import NavHeader from "@/components/Headers/NavHeader";
import ColorsModal from "@/components/Modals/ColorsModal";
import DeleteModal from "@/components/Modals/DeleteModal";
import IconsModal from "@/components/Modals/IconsModal";
import InputModal from "@/components/Modals/InputModal";
import Plug from "@/components/UI/Plug";
import { RenderIcon } from "@/components/UI/RenderIcon";
import { deleteCategory, updateCategory } from "@/db/categories";
import { getTransactionsByCategoryId } from "@/db/transactions";
import { useTheme } from "@/hooks/useTheme";
import { getContrastColor, withOpacity } from "@/utils/color";
import { Category, UpdateCategoryDto } from "@/utils/types/categories";
import { Transaction } from "@/utils/types/transactions";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Switch, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function EditCategoriesScreen() {
  const theme = useTheme();

  const { category } = useLocalSearchParams<{ category?: string }>();

  const parsedCategory: Category | null = category
    ? JSON.parse(category)
    : null;

  const [isOpenIconsModal, setIsOpenIconsModal] = useState(false);
  const [isOpenColorsModal, setIsOpenColorsModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenInputModal, setIsOpenInputModal] = useState(false);

  const [categoryNameValue, setCategoryNameValue] = useState(
    parsedCategory?.name ?? "",
  );
  const [selectedIconName, setSelectedIconName] = useState(
    parsedCategory?.icon ?? "burger",
  );
  const [selectedColor, setSelectedColor] = useState(
    parsedCategory?.color ?? "#ff0000",
  );

  const [gasType, setGasType] = useState(
    parsedCategory?.gasSettings?.gasType || "",
  );

  const [transactionList, setTransactionList] = useState<Transaction[]>([]);

  const [isArchive, setIsArchive] = useState(false);

  if (!parsedCategory) return null;

  const handleDoneEditFunction = async () => {
    const updateDto: UpdateCategoryDto = {
      name: categoryNameValue,
      icon: selectedIconName,
      color: selectedColor,
    };

    if (gasType.trim() !== "") {
      updateDto.gasSettings = {
        gasType: gasType,
        gasValue: parsedCategory.gasSettings?.gasValue || 0,
      };
    }

    await updateCategory(parsedCategory.id, updateDto);
    router.push("/category");
  };

  const fetchTransaction = async () => {
    try {
      const data = getTransactionsByCategoryId(parsedCategory.id);
      setTransactionList(await data);
    } catch (error: unknown) {
      console.error(error);
    }
  };

  fetchTransaction();

  const handleDeleteCategory = async (id: number) => {
    if (!id) return;

    try {
      await deleteCategory(id);

      router.push("/category");
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
        title="Изменение категории"
        isSave
        handleDone={handleDoneEditFunction}
      />
      <View
        style={{ backgroundColor: theme.header }}
        className="w-full p-3 pt-0 flex-col items-start justify-start"
      >
        <CategoryComponent
          category={{
            ...parsedCategory,
            name: categoryNameValue,
            icon: selectedIconName,
            color: selectedColor,
          }}
          fullsize
        />
      </View>
      <View className="flex-col gap-2 w-full flex-1">
        <View className="p-3 flex-col gap-1 w-full items-start justify-start">
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
        <View className="p-3 flex-row w-full items-center justify-between">
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
        <View className="p-3 flex-row w-full items-center justify-between">
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
        {parsedCategory.isGas && (
          <>
            <View className="p-3 flex-row w-full items-center justify-between py-2">
              <Text
                style={{ color: theme.secondary }}
                className="text-sm font-medium"
              >
                Тип бензина:
              </Text>
              <TouchableOpacity onPress={() => setIsOpenInputModal(true)}>
                <Text
                  style={{
                    color: gasType.trim() === "" ? theme.secondary : theme.text,
                  }}
                  className="text-sm font-medium"
                >
                  {gasType.trim() === "" ? "Указать..." : gasType}
                </Text>
              </TouchableOpacity>
            </View>
            <View className="p-3 flex-row w-full items-center justify-between py-2">
              <Text
                style={{ color: theme.secondary }}
                className="text-sm font-medium"
              >
                Заправленно за все время:
              </Text>
              <Text
                style={{ color: theme.text }}
                className="text-sm font-medium"
              >
                {`${parsedCategory.gasSettings?.gasValue || 0} литров`}
              </Text>
            </View>
          </>
        )}
        <Plug />
        <View className="w-full flex-row p-3 items-center justify-between">
          <View className="flex-row gap-2 items-center">
            <ArchiveIcon width={24} height={24} color={theme.text} />
            <Text
              style={{ color: theme.text }}
              className="text-base font-medium"
            >
              Архивная категория
            </Text>
          </View>
          <Switch
            value={isArchive}
            onValueChange={setIsArchive}
            trackColor={{
              false: withOpacity(theme.secondary, 0.8),
              true: withOpacity(theme.primary, 0.8),
            }}
            thumbColor={isArchive ? theme.primary : theme.secondary}
            ios_backgroundColor={theme.secondary}
            style={{ height: 24 }}
          />
        </View>
        <Plug />
        <TouchableOpacity
          className="flex-row p-3 rounded-xl gap-2 w-full items-center justify-start"
          onPress={() => setIsOpenDeleteModal(true)}
        >
          <TrashIcon width={24} height={24} color={theme.red} />
          <Text style={{ color: theme.red }} className="text-base font-medium">
            Удалить категорию
          </Text>
        </TouchableOpacity>
      </View>
      <IconsModal
        visible={isOpenIconsModal}
        onClose={() => setIsOpenIconsModal(false)}
        selectedIcon={selectedIconName}
        onSelect={setSelectedIconName}
      />
      <ColorsModal
        visible={isOpenColorsModal}
        onClose={() => setIsOpenColorsModal(false)}
        selectedColor={selectedColor}
        onSelect={setSelectedColor}
      />
      <DeleteModal
        isCategory
        transactionCount={transactionList.length}
        visible={isOpenDeleteModal}
        onClose={() => setIsOpenDeleteModal(false)}
        handleDone={() => handleDeleteCategory(parsedCategory.id)}
      />
      <InputModal
        title="Укажите каким топливом вы заправляете машину."
        visible={isOpenInputModal}
        onClose={() => setIsOpenInputModal(false)}
        value={gasType}
        onChange={setGasType}
      />
    </View>
  );
}
