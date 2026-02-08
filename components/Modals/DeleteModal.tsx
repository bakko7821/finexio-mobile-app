import TrashIcon from "@/assets/ui/TrashAltSolid.svg";
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
        <View className="flex-row w-full items-center justify-start gap-2">
          <TrashIcon
            width={24}
            height={24}
            color={getContrastColor(theme.card)}
          />
          <Text className="text-lg font-medium">Удалить {item}?</Text>
        </View>
        <Text
          style={{ color: getContrastColor(theme.card) }}
          className="text-base font-regular"
        >
          {item} будет удалена. Действия невозможно будет отменить
        </Text>
        <View className="flex-row w-full items-center justify-end gap-2">
          <TouchableOpacity
            className="items-center justify-center p-2 px-3 rounded-xl"
            onPress={onClose}
          >
            <Text
              style={{
                color: getContrastColor(theme.card),
              }}
              className="text-base font-medium"
            >
              Отменить
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: withOpacity(theme.red, 0.8),
            }}
            className="items-center justify-center p-2 px-3 rounded-xl"
            onPress={handleDone}
          >
            <Text
              style={{
                color: getContrastColor(withOpacity(theme.red, 0.8)),
              }}
              className="text-base font-medium"
            >
              Удалить
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
