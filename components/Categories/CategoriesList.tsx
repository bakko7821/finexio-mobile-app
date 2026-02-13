import { useTheme } from "@/hooks/useTheme";
import { Category } from "@/utils/categories";
import { getContrastColor } from "@/utils/colors";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CreateTransactionsModal from "../UI/modals/CreateTransactions";
import { RenderIcon } from "../UI/RenderIcon";
import InfoCategoryModal from "../UI/modals/InfoCategoryModal";

interface CategoriesListProps {
  categories: Category[];
  list: boolean;
  onRefresh?: () => void;
}

export default function CategoriesList({
  categories,
  list,
  onRefresh,
}: CategoriesListProps) {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [isOpenCreateTransactionModal, setIsOpenCreateTransactionModal] =
    useState(false);
  const [isOpenInfoCategoryModal, setIsOpenInfoCategoryModal] = useState(false);

  if (categories.length === 0) {
    return (
      <Text style={{ color: theme.secondary }} className="text-sm font-medium">
        У вас отсутствуют категории.
      </Text>
    );
  }

  const handlePress = (category: Category) => {
    setSelectedCategory(category);
    setIsOpenCreateTransactionModal(true);
  };

  const handleLongPress = (category: Category) => {
    setSelectedCategory(category);
    setIsOpenInfoCategoryModal(true);
  };

  return (
    <>
      {list ? (
        <View className="w-full flex-col gap-2">
          {categories.map((category) => (
            <TouchableOpacity
              key={category.name}
              style={{ backgroundColor: category.color }}
              className="p-3 w-full flex-row items-center gap-2 justify-start rounded-full"
              onPress={() => handlePress(category)}
              onLongPress={() => handleLongPress(category)}
            >
              <RenderIcon
                name={category.icon}
                width={24}
                height={24}
                color={getContrastColor(category.color)}
              />
              <Text
                style={{ color: getContrastColor(category.color) }}
                className="text-base font-medium"
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View className="w-full flex-row flex-wrap gap-2">
          {categories.map((category) => (
            <TouchableOpacity
              key={category.name}
              style={{ backgroundColor: category.color }}
              className="p-3 rounded-full"
              onPress={() => handlePress(category)}
              onLongPress={() => handleLongPress(category)}
            >
              <RenderIcon
                name={category.icon}
                width={32}
                height={32}
                color={getContrastColor(category.color)}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}
      
      <CreateTransactionsModal
        onRefresh={onRefresh}
        visible={isOpenCreateTransactionModal}
        onClose={() => setIsOpenCreateTransactionModal(false)}
        category={selectedCategory}
      />
      <InfoCategoryModal
        onRefresh={onRefresh}
        category={selectedCategory}
        visible={isOpenInfoCategoryModal}
        onClose={() => setIsOpenInfoCategoryModal(false)}
      />
    </>
  );
}
