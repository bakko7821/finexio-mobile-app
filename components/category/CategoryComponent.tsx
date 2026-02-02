import { useTheme } from "@/hooks/useTheme";
import { getContrastColor, withOpacity } from "@/utils/color";
import { Category } from "@/utils/types/categories";
import React, { Dispatch, SetStateAction } from "react";
import { Text, TouchableOpacity } from "react-native";
import { RenderIcon } from "../UI/RenderIcon";

interface CategoryComponentProps {
  setSelectedCategory?: (category: Category) => void;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  category: Category;
  transparent?: boolean;
  width?: number;
  isIcon?: boolean;
  iconSize?: number;
}

export default function CategoryComponent({
  category,
  setSelectedCategory,
  isOpen,
  setOpen,
  transparent = false,
  isIcon = false,
  iconSize = 24,
  width,
}: CategoryComponentProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      key={category.name}
      className="flex-row gap-1 items-center justify-center border-[2px] border-solid"
      style={{
        backgroundColor: transparent
          ? "transparent"
          : withOpacity(category.color, 0.4) || theme.card,
        width: width,
        height: width,
        padding: isIcon ? 8 : 4,
        borderRadius: isIcon ? 999 : 8,
        borderColor: category.color,
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
        width={iconSize}
        height={iconSize}
        color={
          transparent
            ? theme.text
            : getContrastColor(withOpacity(category.color, 0.4))
        }
      />
      {!isIcon && (
        <Text
          className="text-base font-medium"
          style={{
            color: transparent
              ? theme.text
              : getContrastColor(withOpacity(category.color, 0.4)),
          }}
        >
          {category.name}
        </Text>
      )}
    </TouchableOpacity>
  );
}
