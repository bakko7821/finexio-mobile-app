import { View } from "react-native";
import { SmallCategory, SwipeableSmallCategory } from "./SwipeableSubCategory";
import { SubCategoryFormItem } from "@/utils/categories";

interface SubCategoriesListProps {
  smallCategories: SubCategoryFormItem[];
  selectedColor: string;
  onDelete: (item: SubCategoryFormItem) => void;
}

export const SubCategoriesList: React.FC<SubCategoriesListProps> = ({
  smallCategories,
  onDelete,
  selectedColor,
}) => {
  return (
    <View className="flex-col gap-1 w-full">
      {smallCategories.map((item) => (
        <SwipeableSmallCategory
          key={item.name}
          item={item}
          selectedColor={selectedColor}
          onDelete={onDelete}
        />
      ))}
    </View>
  );
};
