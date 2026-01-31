import CreateCategoryHeader from "@/components/Headers/CreateCategoryHeader";
import { useTheme } from "@/hooks/useTheme";
import { useSearchParams } from "expo-router/build/hooks";
import React from "react";
import { View } from "react-native";

export default function CreateCategoryScreen() {
  const theme = useTheme();
  const params = useSearchParams();

  const selectedColor = params.get("selectedColor") || "#ff0000";
  const selectedIcon = params.get("selectedIcon") || "burger";

  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="w-full h-full flex-1"
    >
      <CreateCategoryHeader
        selectedColor={selectedColor}
        selectedIcon={selectedIcon}
      />
    </View>
  );
}
