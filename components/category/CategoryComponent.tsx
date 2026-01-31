import { useTheme } from "@/hooks/useTheme";
import { getContrastColor } from "@/utils/color";
import { Category } from "@/utils/types/categories";
import React, { Dispatch, SetStateAction } from "react";
import { Text, TouchableOpacity } from "react-native";
import { RenderIcon } from "../UI/RenderIcon";

interface CategoryComponentProps {
  setSelectedCategory?: (category: Category) => void;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  category: Category;
}

export default function CategoryComponent({
  category,
  setSelectedCategory,
  isOpen,
  setOpen,
}: CategoryComponentProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      key={category.name}
      className="p-1 rounded-lg flex-row gap-1 items-center justify-start"
      style={{
        backgroundColor: category.color || theme.secondary,
      }}
      onPress={() => {
        if (!isOpen) {
          setSelectedCategory?.(category);
          setOpen?.(true);
        }
      }}
    >
      <RenderIcon
        name={category.icon}
        width={24}
        height={24}
        color={getContrastColor(category.color)}
      />
      <Text
        className="text-base font-medium"
        style={{ color: getContrastColor(category.color) }}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}
