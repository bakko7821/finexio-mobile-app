import PlusIcon from "@/assets/ui/Plus.svg";
import Plug from "@/components/UI/Plug";
import { useTheme } from "@/hooks/useTheme";
import { Text, TouchableOpacity, View } from "react-native";

import ListIcon from "@/assets/ui/ListOrdered.svg";
import GridIcon from "@/assets/ui/SquareGrid2x2.svg";
import CategoriesList from "@/components/CategoriesList";
import CreateCategoryModal from "@/components/UI/modals/CreateCategory";
import { useState } from "react";

export default function CategoriesScreen() {
  const theme = useTheme();
  const [isList, setIsList] = useState(false);
  const [categoriesType, setCategoriesType] = useState(1);
  const [isVisibleCreateCategoryModal, setIsVisibleCreateCategoryModal] =
    useState(false);

  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="pt-[50px] flex-1 flex-col gap-2 items-start justify-start relative"
    >
      <TouchableOpacity
        style={{
          borderColor: theme.secondary,
          backgroundColor: theme.header,
        }}
        onPress={() => setIsVisibleCreateCategoryModal(true)}
        className="items-center justify-center absolute bottom-[0px] left-[16px] p-2 rounded-full border-[2px] border-dashed"
      >
        <PlusIcon width={32} height={32} color={theme.text} />
      </TouchableOpacity>
      <View className="flex-col w-full gap-2">
        <View>
          <Text
            style={{ color: theme.text }}
            className="px-4 text-lg font-medium"
          >
            Статистика {categoriesType === 1 ? "(Расходы)" : "(Доходы)"}
          </Text>
          <Text
            style={{ color: theme.secondary }}
            className="text-sm font-medium px-4"
          >
            Нажимите в центр графика чтобы указать{" "}
            {categoriesType === 1 ? "доходы" : "расходы"}.
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setCategoriesType((prev) => (prev === 1 ? 2 : 1))}
          style={{ backgroundColor: theme.card }}
          className="w-full p-4"
        ></TouchableOpacity>
      </View>
      <Plug />
      <View className="flex-col w-full gap-2">
        <View className="px-4 flex-row w-full items-center justify-between">
          <Text style={{ color: theme.text }} className="text-lg font-medium">
            Категории
          </Text>
          <TouchableOpacity onPress={() => setIsList((prev) => !prev)}>
            {isList ? (
              <ListIcon width={24} height={24} color={theme.secondary} />
            ) : (
              <GridIcon width={24} height={24} color={theme.secondary} />
            )}
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: theme.card }} className="w-full p-4">
          <CategoriesList list={isList} />
        </View>
      </View>
      <CreateCategoryModal
        title="Новая категория"
        visible={isVisibleCreateCategoryModal}
        onClose={() => setIsVisibleCreateCategoryModal(false)}
      />
    </View>
  );
}
