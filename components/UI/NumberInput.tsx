import CalendarIcon from "@/assets/ui/Calendar4Week.svg";
import ClearIcon from "@/assets/ui/ClearCharacterOutline.svg";
import TickIcon from "@/assets/ui/Tick.svg";
import { useTheme } from "@/hooks/useTheme";
import { getContrastColor } from "@/utils/color";
import React, { Dispatch, SetStateAction } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, "₽", 0, ","];

interface NumberInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onRequest: () => void;
  nullDate?: boolean;
}

export default function NumberInput({
  value,
  setValue,
  onRequest,
  nullDate = false,
}: NumberInputProps) {
  const theme = useTheme();

  const addCount = (num: string | number) => {
    if (num === "₽") return;

    setValue((prev) => {
      if (prev === "0") return String(num);
      return prev + String(num);
    });
  };

  return (
    <View className="py-2 flex-row items-center justify-center gap-2">
      <View className="flex-row flex-wrap gap-2 w-[160px] items-center justify-center">
        {numbers.map((num) => (
          <TouchableOpacity
            key={num}
            style={{
              backgroundColor: theme.card,
              borderColor: theme.secondary,
            }}
            className="w-[48px] h-[48px] border border-solid rounded-xl items-center justify-center"
            onPress={() => addCount(num)}
          >
            <Text style={{ color: theme.text }} className="text-xl font-medium">
              {num}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View className="flex-col gap-2">
        <TouchableOpacity
          style={{ backgroundColor: theme.card, borderColor: theme.secondary }}
          className="w-[48px] h-[48px] rounded-xl border border-solid items-center justify-center"
          onPress={() =>
            setValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"))
          }
        >
          <ClearIcon width={32} height={32} color={theme.red} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: !nullDate ? theme.card : "transparent",
            borderColor: !nullDate ? theme.secondary : "transparent",
            borderWidth: !nullDate ? 1 : 0,
          }}
          className="w-[48px] h-[48px] rounded-xl items-center justify-center"
        >
          {!nullDate && (
            <CalendarIcon width={24} height={24} color={theme.text} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: theme.green }}
          className="w-[48px] flex-1 rounded-xl items-center justify-center"
          onPress={onRequest}
        >
          <TickIcon
            width={24}
            height={24}
            color={getContrastColor(theme.green)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
