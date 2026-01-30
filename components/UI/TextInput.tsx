import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { TextInput, View } from "react-native";

interface TextInputProps {
  value: string;
  onChange: (text: string) => void;
  placeholder: string;
}

export default function TextInputComponent({
  value,
  onChange,
  placeholder,
}: TextInputProps) {
  const theme = useTheme();

  return (
    <View
      style={{ borderColor: theme.text }}
      className="p-1 w-full border-b-[1px]"
    >
      <TextInput
        style={{ color: theme.text }}
        className="p-0 text-base font-regular"
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        placeholderTextColor={`${theme.secondary}`} // цвет placeholder
      />
    </View>
  );
}
