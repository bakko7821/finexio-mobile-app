import { getContrastColor } from "@/utils/colors";
import { Category } from "@/utils/types/categories";
import { Text, View } from "react-native";
import { RenderIcon } from "../UI/RenderIcon";

interface CategoryComponentProps {
  category: Category | null;
  fullsize?: boolean;
  smallIcon?: boolean;
}

export default function CategoryComponent({
  category,
  fullsize = false,
  smallIcon = false,
}: CategoryComponentProps) {
  if (category !== null && smallIcon === true)
    return (
      <View
        style={{ backgroundColor: category.color }}
        className="p-2 rounded-full items-center justify-center"
      >
        <RenderIcon
          name={category.icon}
          width={24}
          height={24}
          color={getContrastColor(category.color)}
        />
      </View>
    );

  if (category !== null)
    return (
      <View
        style={{
          backgroundColor: category.color,
          padding: fullsize ? 12 : 4,
          paddingHorizontal: fullsize ? 12 : 8,
          borderRadius: fullsize ? 12 : 999,
          gap: fullsize ? 8 : 4,
        }}
        className="w-full flex-row items-center justify-start"
      >
        <RenderIcon
          name={category.icon}
          width={fullsize ? 24 : 16}
          height={fullsize ? 24 : 16}
          color={getContrastColor(category.color)}
        />
        <Text
          style={{ color: getContrastColor(category.color) }}
          className={fullsize ? "text-base font-medium" : "text-xs font-medium"}
        >
          {category.name}
        </Text>
      </View>
    );
}
