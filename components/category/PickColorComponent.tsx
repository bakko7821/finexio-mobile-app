import { colorsArray, getContrastColor } from "@/utils/color";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

interface PickColorComponentProps {
  selectedColor: string | null;
  onSelect: (color: string) => void;
}

export default function PickColorComponent({
  selectedColor,
  onSelect,
}: PickColorComponentProps) {
  return (
    <ScrollView
      className="p-3 flex-1"
      contentContainerStyle={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 8,
        paddingBottom: 16,
      }}
    >
      {colorsArray.map((color) => {
        const isSelected = selectedColor === color.color;

        return (
          <TouchableOpacity
            key={color.color}
            onPress={() => onSelect(color.color)}
            className="w-[48px] h-[48px] rounded-full flex items-center justify-center p-[6px]"
            style={{ backgroundColor: color.color }}
          >
            {isSelected && (
              <View
                className="w-full h-full rounded-full"
                style={{
                  borderWidth: isSelected ? 3 : 0,
                  borderColor: isSelected
                    ? getContrastColor(color.color)
                    : "transparent",
                  backgroundColor: color.color,
                }}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
