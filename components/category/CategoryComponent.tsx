import EditIcon from "@/assets/ui/Edit.svg";
import TrashIcon from "@/assets/ui/TrashAltSolid.svg";
import { useTheme } from "@/hooks/useTheme";
import { getContrastColor, withOpacity } from "@/utils/color";
import { Category } from "@/utils/types/categories";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { RenderIcon } from "../UI/RenderIcon";

interface CategoryComponentProps {
  category: Category | undefined;
  fullsize?: boolean;
  isEditing?: boolean;
}

export default function CategoryComponent({
  category,
  fullsize = false,
  isEditing = false,
}: CategoryComponentProps) {
  const router = useRouter();
  const theme = useTheme();

  if (!category) return;

  return (
    <View
      key={category.name}
      className="flex-row items-center justify-between border-[2px] border-solid rounded-xl p-1"
      style={{
        backgroundColor: withOpacity(category.color || theme.card, 0.4),
        borderColor: category.color,
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
      {isEditing && (
        <View className="flex-row gap-1 items-center justify-center">
          <TouchableOpacity
            style={{ backgroundColor: withOpacity(theme.secondary, 0.5) }}
            className="p-1 rounded-lg"
            onPress={() => router.push("/all-categories")}
          >
            <EditIcon
              width={20}
              height={20}
              color={getContrastColor(withOpacity(category.color, 0.4))}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: withOpacity(theme.secondary, 0.5) }}
            className="p-1 rounded-lg"
          >
            <TrashIcon
              width={20}
              height={20}
              color={getContrastColor(withOpacity(category.color, 0.4))}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
