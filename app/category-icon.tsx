import PickColorComponent from "@/components/category/PickColorComponent";
import PickIconComponent from "@/components/category/PickIconComponent";
import CategoryIconHeader from "@/components/Headers/CategoryIconHeader";
import { useTheme } from "@/hooks/useTheme";
import React, { useState } from "react";
import { View } from "react-native";

export default function CategoryIconScreen() {
  const theme = useTheme();
  const [isColorActive, setIsColorActive] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ff0000");
  const [selectedIconName, setSelectedIconName] = useState("burger");

  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="w-full h-full flex-1"
    >
      <CategoryIconHeader
        isColor={isColorActive}
        setIsColor={setIsColorActive}
        selectedColor={selectedColor}
        selectedIcon={selectedIconName}
      />
      {!isColorActive ? (
        <PickIconComponent
          selectedIcon={selectedIconName}
          onSelect={setSelectedIconName}
        />
      ) : (
        <PickColorComponent
          selectedColor={selectedColor}
          onSelect={setSelectedColor}
        />
      )}
    </View>
  );
}
