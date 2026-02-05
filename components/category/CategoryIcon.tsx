import { useTheme } from "@/hooks/useTheme";
import { getContrastColor } from "@/utils/color";
import { Category } from "@/utils/types/categories";
import React, { Dispatch, SetStateAction } from "react";
import { Text, TouchableOpacity } from "react-native";
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
  renderType: string;
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
  renderType,
}: CategoryIcon) {
  const theme = useTheme();

  if (!category.icon) return;

  if (renderType === "grid")
    return (
      <TouchableOpacity
        style={{
          backgroundColor: category.color,
        }}
        className="p-2 rounded-full"
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
          width={32}
          height={32}
          color={getContrastColor(category.color)}
        />
      </TouchableOpacity>
    );

  if (renderType === "list")
    return (
      <TouchableOpacity
        style={{
          backgroundColor: category.color,
          borderColor: category.color,
        }}
        className="p-2 gap-1 flex-row items-center justify-start rounded-full border-[2px] border-solid"
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
    );
}
