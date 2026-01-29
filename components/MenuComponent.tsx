import React from "react";
import {
    Modal,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import CrossIcon from "../assets/icons/cross-svgrepo-com.svg";

interface MenuComponentProps {
  visible: boolean;
  onClose: () => void;
}

export default function MenuComponent({
  visible,
  onClose,
}: MenuComponentProps) {
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
            <View className="bg-red-300 w-[60%] h-full">
              <View className="p-2 w-full flex-row justify-between items-center">
                <Text>Меню</Text>
                <TouchableOpacity onPress={onClose}>
                  <CrossIcon width={24} height={24} color="#000" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
