import CrossIcon from "@/assets/ui/cross-svgrepo-com.svg";
import { useTheme } from "@/hooks/useTheme";
import { SCREEN_HEIGHT } from "@/utils/types/variables";
import React from "react";
import {
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Modal from "react-native-modal";
import PickIconComponent from "../category/PickIconComponent";

interface IconsModalProps {
  visible: boolean;
  onClose: () => void;
  selectedIcon: string;
  onSelect: (icon: string) => void;
}

export default function IconsModal({
  visible,
  onClose,
  selectedIcon,
  onSelect,
}: IconsModalProps) {
  const theme = useTheme();
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
        style={{
          backgroundColor: theme.card,
          maxHeight: SCREEN_HEIGHT * 0.7,
          height: SCREEN_HEIGHT * 0.7,
        }}
        className="rounded-t-3xl flex-1 w-full bottom-0 absolute flex-col items-start justify-start"
      >
        <View className="w-full flex-row items-center justify-between p-3">
          <Text style={{ color: theme.text }} className="text-base font-medium">
            Список иконок
          </Text>
          <TouchableOpacity onPress={onClose}>
            <CrossIcon width={24} height={24} color={theme.text} />
          </TouchableOpacity>
        </View>
        <PickIconComponent selectedIcon={selectedIcon} onSelect={onSelect} />
      </View>
    </Modal>
  );
}
