import CreateCategoryHeader from "@/components/Headers/CreateCategoryHeader";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { View } from "react-native";

export default function CreateCategoryScreen() {
  const theme = useTheme();

  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="bg-red-100 w-full h-full flex-1"
    >
      <CreateCategoryHeader />
    </View>
  );
}
