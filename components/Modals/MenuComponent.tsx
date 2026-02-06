import CrossIcon from "@/assets/ui/cross-svgrepo-com.svg";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

interface MenuComponentProps {
  visible: boolean;
  onClose: () => void;
}

export default function MenuComponent({
  visible,
  onClose,
}: MenuComponentProps) {
  const theme = useTheme();
  return (
    <Modal
      isVisible={visible}
      /** АНИМАЦИИ */
      animationIn="slideInRight"
      animationOut="slideOutRight"
      /** ФОН (fade отдельно) */
      backdropOpacity={0.5}
      backdropTransitionInTiming={250}
      backdropTransitionOutTiming={200}
      /** КОНТЕНТ */
      animationInTiming={300}
      animationOutTiming={250}
      /** ЗАКРЫТИЕ */
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      /** КРИТИЧЕСКИ ВАЖНО */
      useNativeDriver
      hideModalContentWhileAnimating
      style={{ margin: 0 }}
    >
      <View
        style={{ backgroundColor: theme.header }}
        className=" w-[60%] h-full self-end"
      >
        <View className="p-3 flex-row justify-between items-center">
          <Text style={{ color: theme.text }} className="text-lg font-medium">
            Меню
          </Text>

          <TouchableOpacity onPress={onClose}>
            <CrossIcon width={24} height={24} color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
