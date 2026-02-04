import { useTheme } from "@/hooks/useTheme";
import { getContrastColor, withOpacity } from "@/utils/color";
import { Category } from "@/utils/types/categories";
import React from "react";
import { Text, View } from "react-native";
import { RenderIcon } from "../UI/RenderIcon";

interface CategoryComponentProps {
  category: Category | undefined;
  fullsize?: boolean;
  isEditing?: boolean;
}

export default function CategoryComponent({
  category,
  fullsize = false,
}: CategoryComponentProps) {
  const theme = useTheme();

  if (!category) return;

  return (
    <View
      key={category.name}
      className="flex-row items-center justify-between rounded-xl p-2"
      style={{
        backgroundColor: withOpacity(category.color || theme.card, 0.4),
        // borderColor: category.color,
        width: fullsize ? "100%" : "auto",
      }}
    >
      <View className="flex-row gap-1 items-center justify-center">
        <RenderIcon
          name={category.icon}
          width={32}
          height={32}
          color={getContrastColor(withOpacity(category.color, 0.4))}
        />
        <Text
          className="text-lg font-medium"
          style={{
            color: getContrastColor(withOpacity(category.color, 0.4)),
          }}
        >
          {category.name}
        </Text>
      </View>
    </View>
  );
}
