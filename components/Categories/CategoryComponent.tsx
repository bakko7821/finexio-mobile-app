import { useTheme } from "@/hooks/useTheme";
import { Category } from "@/utils/categories";
import { getContrastColor } from "@/utils/colors";
import { Text, View } from "react-native";
import { RenderIcon } from "../UI/RenderIcon";

interface CategoryComponentProps {
  category: Category  | null;
  fullsize?: boolean;
  smallIcon?: boolean;
}

export default function CategoryComponent({
  category,
  fullsize = false,
  smallIcon = false,
}: CategoryComponentProps) {
  const theme = useTheme();

  if (category !== null && smallIcon === true) return (
    <View style={{backgroundColor: category.color}} className="p-2 rounded-full items-center justify-center">
      <RenderIcon name={category.icon} width={16} height={16} />
    </View>
  )

  if (category !== null) return (
    <View
      style={{ backgroundColor: category.color}}
      className="w-full flex-row items-center justify-start gap-2 p-3 rounded-xl"
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
    </View>
  );
}
