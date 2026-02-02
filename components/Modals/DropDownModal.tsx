import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface DropDownModalProps {
  position?: {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
  };
}

export default function DropDownModal({ position }: DropDownModalProps) {
  const theme = useTheme();
  return (
    <View
      className="absolute rounded-xl p-2"
      style={{
        zIndex: 999,
        left: position?.left,
        right: position?.right,
        top: position?.top,
        bottom: position?.bottom,
        backgroundColor: theme.card,
      }}
    >
      <TouchableOpacity>
        <Text>Редактировать</Text>
      </TouchableOpacity>
    </View>
  );
}
