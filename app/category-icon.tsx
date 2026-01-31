import PickColorComponent from "@/components/category/PickColorComponent";
import PickIconComponent from "@/components/category/PickIconComponent";
import CategoryIconHeader from "@/components/Headers/CategoryIconHeader";
import { useTheme } from "@/hooks/useTheme";
import React, { useState } from "react";
import { View } from "react-native";

export default function CategoryIconScreen() {
  const theme = useTheme();
  const [isColor, setIsColor] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>("#ff0000");

  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="w-full h-full flex-1"
    >
      <CategoryIconHeader isColor={isColor} setIsColor={setIsColor} />
      {!isColor ? (
        <PickIconComponent />
      ) : (
        <PickColorComponent
          selectedColor={selectedColor}
          onSelect={setSelectedColor}
        />
      )}
    </View>
  );
}
