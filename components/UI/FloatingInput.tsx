import { useTheme } from "@/hooks/useTheme";
import { useState } from "react";
import { Platform, Text, TextInput, View } from "react-native";

interface FloatingInputProps {
  name: string;
  setName: (text: string) => void;
}

export default function FloatingInput({ name, setName }: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const theme = useTheme();

  return (
    <View
      style={{
        borderColor: theme.primary,
      }}
      className="p-2 flex-col items-start justify-start gap-1 rounded-xl w-full text-base border-[2px] border-solid"
    >
      {(isFocused || name.length > 0) && (
        <Text
          style={{ color: theme.secondary }}
          className="text-sm font-medium"
        >
          Название категории <Text style={{ color: theme.red }}>*</Text>
        </Text>
      )}
      <TextInput
        style={{
          color: theme.text,
          padding: 0,
        }}
        placeholder={isFocused ? 'Например: "Еда"' : "Название категории"}
        placeholderTextColor={theme.secondary}
        className="w-full"
        {...Platform.select({
          android: { includeFontPadding: false },
        })}
        value={name}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChangeText={setName}
      />
    </View>
  );
}
