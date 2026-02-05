import { useTheme } from "@/hooks/useTheme";
import { getContrastColor } from "@/utils/color";
import { Category } from "@/utils/types/categories";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { RenderIcon } from "../UI/RenderIcon";

interface CategoryComponentProps {
  category: Category | undefined;
  fullsize?: boolean;
  isEditing?: boolean;
  isTouchale?: boolean;
}

export default function CategoryComponent({
  category,
  fullsize = false,
  isTouchale = false,
}: CategoryComponentProps) {
  const theme = useTheme();

  if (!category) return;

  if (isTouchale)
    return (
      <TouchableOpacity
        key={category.name}
        className="flex-row items-center justify-between"
        style={{
          backgroundColor: category.color,
          width: fullsize ? "100%" : "auto",
          padding: fullsize ? 8 : 4,
          borderRadius: fullsize ? 12 : 8,
        }}
        onPress={() => alert("123")}
      >
        <View className="flex-row gap-1 items-center justify-center">
          <RenderIcon
            name={category.icon}
            width={fullsize ? 32 : 20}
            height={fullsize ? 32 : 20}
            color={getContrastColor(category.color)}
          />
          <Text
            className={fullsize ? "text-lg font-medium" : "text-sm font-medium"}
            style={{
              color: getContrastColor(category.color),
            }}
          >
            {category.name}
          </Text>
        </View>
      </TouchableOpacity>
    );

  return (
    <View
      key={category.name}
      className="flex-row items-center justify-between"
      style={{
        backgroundColor: category.color,
        width: fullsize ? "100%" : "auto",
        padding: fullsize ? 8 : 4,
        borderRadius: fullsize ? 12 : 8,
      }}
    >
      <View className="flex-row gap-1 items-center justify-center">
        <RenderIcon
          name={category.icon}
          width={fullsize ? 32 : 20}
          height={fullsize ? 32 : 20}
          color={getContrastColor(category.color)}
        />
        <Text
          className={fullsize ? "text-lg font-medium" : "text-sm font-medium"}
          style={{
            color: getContrastColor(category.color),
          }}
        >
          {category.name}
        </Text>
      </View>
    </View>
  );
}
