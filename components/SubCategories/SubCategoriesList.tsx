import { View } from "react-native";
import { SmallCategory, SwipeableSmallCategory } from "./SwipeableSubCategory";

interface SubCategoriesListProps {
  smallCategories: SmallCategory[];
  selectedColor: string;
  onDelete: (name: string) => void;
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
