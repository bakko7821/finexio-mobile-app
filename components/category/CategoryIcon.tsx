import { useTheme } from "@/hooks/useTheme";
import { getContrastColor, withOpacity } from "@/utils/color";
import { Category } from "@/utils/types/categories";
import React, { Dispatch, SetStateAction } from "react";
import { TouchableOpacity } from "react-native";
import { RenderIcon } from "../UI/RenderIcon";

interface CategoryIcon {
  category: Category;
  width?: number;
  iconSize?: number;
  onSelect?: (category: Category) => void;
  isOpen?: boolean;
  onOpen?: Dispatch<SetStateAction<boolean>>;
  isOpenSmallPanel?: boolean;
  onOpenSmallPanel?: Dispatch<SetStateAction<boolean>>;
}

export default function CategoryIcon({
  category,
  width,
  iconSize,
  onSelect,
  isOpen,
  onOpen,
  isOpenSmallPanel,
  onOpenSmallPanel,
}: CategoryIcon) {
  const theme = useTheme();

  if (!category.icon) return;

  return (
    <TouchableOpacity
      style={{
        backgroundColor: withOpacity(category.color, 0.4),
        borderColor: category.color,
      }}
      className="p-2 rounded-full border-[2px] border-solid"
      onPress={() => {
        if (!isOpen) {
          onSelect?.(category);
          onOpen?.(true);
        }
      }}
      onLongPress={() => {
        if (!isOpenSmallPanel) {
          onSelect?.(category);
          onOpenSmallPanel?.(true);
        }
      }}
      delayLongPress={400}
    >
      <RenderIcon
        name={category.icon}
        width={iconSize}
        height={iconSize}
        color={getContrastColor(withOpacity(category.color, 0.4))}
      />
    </TouchableOpacity>
  );
}
