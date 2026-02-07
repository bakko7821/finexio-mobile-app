import CrossIcon from "@/assets/ui/cross-svgrepo-com.svg";
import { useTheme } from "@/hooks/useTheme";
import { getContrastColor, withOpacity } from "@/utils/color";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

interface CreateSmallCategoryModalProps {
  visible: boolean;
  onClose: () => void;
  selectedColor: string;
  handleDone: (name: string) => void;
}

export default function CreateSmallCategoryModal({
  visible,
  onClose,
  selectedColor,
  handleDone,
}: CreateSmallCategoryModalProps) {
  const theme = useTheme();

  const [smallName, setSmallName] = useState("");

  return (
    <Modal
      isVisible={visible}
      /** АНИМАЦИИ */
      animationIn="slideInUp"
      animationOut="slideOutDown"
      /** TIMING */
      animationInTiming={300}
      animationOutTiming={250}
      backdropTransitionInTiming={250}
      backdropTransitionOutTiming={200}
      /** ФОН */
      backdropOpacity={0.5}
      /** ЗАКРЫТИЕ */
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      /** КРИТИЧНО */
      useNativeDriver
      hideModalContentWhileAnimating
      style={{ margin: 0, justifyContent: "flex-end" }}
    >
      <View
        style={{ backgroundColor: theme.header }}
        className="rounded-t-3xl p-3 pb-[16px]"
      >
        {/* HEADER */}
        <View className="w-full flex-row items-center justify-between mb-2">
          <Text style={{ color: theme.text }} className="text-base font-medium">
            Новая подкатегория
          </Text>

          <TouchableOpacity onPress={onClose}>
            <CrossIcon width={24} height={24} color={theme.text} />
          </TouchableOpacity>
        </View>

        {/* CONTENT */}
        <View className="flex-col gap-3">
          <View className="flex-col items-start justify-start gap-1">
            <Text
              style={{ color: theme.secondary }}
              className="text-sm font-medium"
            >
              Название подкатегории:
            </Text>
            <View
              style={{ backgroundColor: selectedColor }}
              className="rounded-xl overflow-hidden w-full p-2"
            >
              <TextInput
                style={{ color: getContrastColor(selectedColor) }}
                className="text-base font-regular p-0 w-full items-start justify-start"
                placeholderTextColor={
                  withOpacity(getContrastColor(selectedColor), 0.6) ||
                  theme.secondary
                }
                value={smallName}
                placeholder="Правильное питание"
                onChangeText={(text: string) => setSmallName(text)}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{ backgroundColor: theme.primary }}
            className="w-full p-3 rounded-xl items-center justify-center"
            onPress={() => {
              handleDone(smallName);
              setSmallName("");
              onClose(); // <- обязательно вызываем!
            }}
          >
            <Text
              style={{ color: getContrastColor(theme.background) }}
              className="text-base font-medium"
            >
              Сохранить
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
