import { useTheme } from "@/hooks/useTheme";
import { Text, TouchableOpacity, View } from "react-native";

import CrossIcon from "@/assets/ui/CrossFilled.svg";
import { getContrastColor } from "@/utils/colors";
import { useState } from "react";
import Modal from "react-native-modal";
import FloatingInput from "../FloatingInput";

interface CreateCategoryModalProps {
  title: string;
  visible: boolean;
  onClose: () => void;
}

export default function CreateCategoryModal({
  title = "Новая категория",
  visible,
  onClose,
}: CreateCategoryModalProps) {
  const theme = useTheme();
  const [headerTitle, setHeaderTitle] = useState(title);

  const [isCreateComponent, setIsCreateComponent] = useState(true);
  const [isIconComponent, setIsIconComponent] = useState(false);
  const [isColorComponent, setIsColorComponent] = useState(false);

  const [categoryNameValue, setCategoryNameValue] = useState("");

  return (
    <Modal
      isVisible={visible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionOutTiming={300}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      useNativeDriver
      style={{ margin: 0, justifyContent: "flex-end" }}
    >
      <View
        style={{ backgroundColor: theme.header }}
        className="rounded-t-3xl p-4 gap-3 flex-col min-h-[80%]"
      >
        <View className="flex-row items-center justify-between">
          <Text style={{ color: theme.text }} className="text-base font-medium">
            {headerTitle}
          </Text>
          <TouchableOpacity onPress={onClose}>
            <CrossIcon width={24} height={24} color={theme.text} />
          </TouchableOpacity>
        </View>
        {isCreateComponent && (
          <View className="flex-col gap-2 w-full flex-1">
            <FloatingInput
              name={categoryNameValue}
              setName={(text: string) => setCategoryNameValue(text)}
            />
            <View className="w-full items-center justify-between">
              <Text
                style={{ color: theme.secondary }}
                className="text-base font-medium"
              >
                Иконка:
              </Text>
              
            </View>
          </View>
        )}
        {isIconComponent && <View className="w-full flex-1"></View>}
        {isColorComponent && <View className="w-full flex-1"></View>}
        <TouchableOpacity
          style={{ backgroundColor: theme.primary }}
          className="flex-row w-full item-center justify-center p-3 rounded-full"
        >
          <Text
            style={{ color: getContrastColor(theme.primary) }}
            className="text-base font-medium"
          >
            Создать
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
