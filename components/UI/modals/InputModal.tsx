import CrossIcon from "@/assets/ui/cross-svgrepo-com.svg";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

interface InputModalProps {
  title: string;
  visible: boolean;
  onClose: () => void;
  handleDone?: () => void;
  value: string;
  onChange: (text: string) => void;
}

export default function InputModal({
  visible,
  title,
  onClose,
  handleDone,
  value,
  onChange,
}: InputModalProps) {
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
        className="rounded-3xl max-w-[86%] w-[86%] p-3 flex-col items-start justify-start gap-2"
      >
        <View className="w-full items-center justify-between flex-row">
          <Text
            style={{ color: theme.text }}
            className="w-[70%] text-sm font-medium"
          >
            {title}
          </Text>
          <TouchableOpacity>
            <CrossIcon width={24} height={24} color={theme.text} />
          </TouchableOpacity>
        </View>
        <View
          style={{ borderColor: theme.secondary }}
          className="w-full rounded-xl items-start justify-start border-[2px] border-solid"
        >
          <TextInput
            value={value}
            placeholder="АИ-92"
            placeholderTextColor={theme.secondary}
            onChangeText={onChange}
            style={{
              width: "100%",
              height: 40, // задаём нормальную высоту
              paddingHorizontal: 10, // внутренние отступы слева/справа
              color: theme.text, // текст видим
            }}
          />
        </View>
        <TouchableOpacity
          style={{ backgroundColor: theme.primary }}
          className="p-3 w-full rounded-xl items-center justify-center"
          onPress={() => {
            handleDone?.();
            onClose();
          }}
        >
          <Text style={{ color: "#ffffff" }} className="text-base font-medium">
            Сохранить
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
