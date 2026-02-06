import { useTheme } from "@/hooks/useTheme";
import { getContrastColor, withOpacity } from "@/utils/color";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

interface DeleteModalProps {
  item: string;
  visible: boolean;
  onClose: () => void;
  handleDone: () => void;
}

export default function DeleteModal({
  item,
  visible,
  onClose,
  handleDone,
}: DeleteModalProps) {
  const theme = useTheme();
  return (
    <Modal
      isVisible={visible}
      /** АНИМАЦИИ */
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
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
      style={{ margin: 0, justifyContent: "center", alignItems: "center" }}
    >
      <View
        style={{ backgroundColor: theme.card }}
        className="rounded-3xl max-w-[86%] p-3 flex-col items-start justify-start gap-2"
      >
        <Text
          style={{ color: getContrastColor(theme.card) }}
          className="text-base font-regular"
        >
          Вы действительно хотите удалить {item}?
        </Text>
        <View className="flex-row w-full items-center gap-2">
          <TouchableOpacity
            style={{
              backgroundColor: withOpacity(theme.red, 0.8),
            }}
            className="items-center justify-center p-2 rounded-xl w-[30%]"
            onPress={handleDone}
          >
            <Text
              style={{
                color: getContrastColor(withOpacity(theme.red, 0.8)),
              }}
              className="text-base font-medium"
            >
              Да
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: withOpacity(theme.primary, 0.8),
            }}
            className="items-center justify-center p-2 rounded-xl flex-1"
            onPress={onClose}
          >
            <Text
              style={{
                color: getContrastColor(withOpacity(theme.primary, 0.8)),
              }}
              className="text-base font-medium"
            >
              Отменить
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
