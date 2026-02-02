import CrossIcon from "@/assets/ui/cross-svgrepo-com.svg";
import { useTheme } from "@/hooks/useTheme";
import { SCREEN_HEIGHT } from "@/utils/types/variables";
import React from "react";
import {
    Modal,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import PickColorComponent from "../category/PickColorComponent";

interface ColorsModalProps {
  visible: boolean;
  onClose: () => void;
  selectedColor: string;
  onSelect: (icon: string) => void;
}

export default function ColorsModal({
  visible,
  onClose,
  selectedColor,
  onSelect,
}: ColorsModalProps) {
  const theme = useTheme();
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/50 relative">
          <TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: theme.card,
                maxHeight: SCREEN_HEIGHT * 0.7,
                height: SCREEN_HEIGHT * 0.7,
              }}
              className="rounded-t-3xl flex-1 w-full bottom-0 absolute flex-col items-start justify-start"
            >
              <View className="w-full flex-row items-center justify-between p-3">
                <Text
                  style={{ color: theme.text }}
                  className="text-base font-medium"
                >
                  Список цветов
                </Text>
                <TouchableOpacity onPress={onClose}>
                  <CrossIcon width={24} height={24} color={theme.text} />
                </TouchableOpacity>
              </View>
              <PickColorComponent
                selectedColor={selectedColor}
                onSelect={onSelect}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
