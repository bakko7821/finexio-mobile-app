import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { View } from "react-native";

export default function AllCategoriesScreen() {
  const theme = useTheme();
  return <View style={{ backgroundColor: theme.background }}></View>;
}
