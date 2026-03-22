import CrossIcon from "@/assets/ui/CrossFilled.svg";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

interface InputModalProps {
  title: string;
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function EmptyModal({
  visible,
  title,
  onClose,
  children,
}: InputModalProps) {
  const theme = useTheme();

  const SCREEN_HEIGHT = Dimensions.get("window").height;

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriver
      hideModalContentWhileAnimating
      backdropTransitionOutTiming={0}
      style={{ margin: 0, justifyContent: "flex-end" }}
    >
      {/* Контейнер снизу */}
      <View
        style={{
          backgroundColor: theme.header,
          maxHeight: SCREEN_HEIGHT * 0.5,
          flex: 1, // 👈 ВАЖНО
        }}
        className="rounded-t-3xl pt-3 pb-6 px-4"
      >
        {/* Drag indicator */}
        <View className="w-10 h-1.5 bg-gray-400/40 rounded-full self-center mb-3" />

        {/* Header */}
        <View className="w-full flex-row items-center justify-between mb-2">
          <Text
            style={{ color: theme.text }}
            className="text-base font-medium flex-1"
            numberOfLines={1}
          >
            {title}
          </Text>

          <TouchableOpacity
            onPress={onClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <CrossIcon width={22} height={22} color={theme.text} />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>{children}</View>
      </View>
    </Modal>
  );
}
