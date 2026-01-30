import { useTheme } from "@/hooks/useTheme";
import React, { useState } from "react";
import { TextInput, View } from "react-native";

interface TextInputProps {
  placeholder: string;
}

export default function TextInputComponent({ placeholder }: TextInputProps) {
  const theme = useTheme();
  const [value, setValue] = useState("");

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
        onChangeText={setValue}
        placeholderTextColor={`${theme.secondary}`} // цвет placeholder
      />
    </View>
  );
}
