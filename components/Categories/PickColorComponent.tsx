import { colorsArray, withOpacity } from "@/utils/colors";
import React, { useEffect, useMemo, useState } from "react";
import {
  InteractionManager,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

interface PickColorComponentProps {
  selectedColor: string | null;
  onSelect: (color: string) => void;
}

const FIRST_BATCH_SIZE = 66; // сколько цветов рендерим сразу

export default function PickColorComponent({
  selectedColor,
  onSelect,
}: PickColorComponentProps) {
  // --- progressive data ---
  const initialData = useMemo(() => colorsArray.slice(0, FIRST_BATCH_SIZE), []);
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      setData(colorsArray); // подгружаем все цвета после первой отрисовки
    });

    return () => task.cancel();
  }, []);

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 8,
        paddingBottom: 16,
        paddingTop: 4,
      }}
    >
      {data.map((color) => {
        const isSelected = selectedColor === color.color;

        return (
          <TouchableOpacity
            key={color.color}
            onPress={() => onSelect(color.color)}
            className="w-[48px] h-[48px] rounded-full flex items-center justify-center p-[6px]"
            style={{
              backgroundColor: isSelected
                ? withOpacity(color.color, 0.4)
                : color.color,
            }}
          >
            {isSelected && (
              <View
                className="w-full h-full rounded-full"
                style={{
                  borderWidth: 3,
                  borderColor: color.color,
                  backgroundColor: "transparent",
                }}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
