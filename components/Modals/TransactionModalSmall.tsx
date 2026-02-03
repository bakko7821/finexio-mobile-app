import { useTheme } from "@/hooks/useTheme";
import { Transaction } from "@/utils/types/transactions";
import { useRouter } from "expo-router";
import React from "react";
import { Modal, Text, TouchableWithoutFeedback, View } from "react-native";

interface MenuComponentProps {
  visible: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

export default function TransactionModalSmall({
  visible,
  onClose,
  transaction,
}: MenuComponentProps) {
  const theme = useTheme();
  const router = useRouter();

  if (!transaction) return;

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
            <View className="rounded-t-3xl flex-1 w-full bottom-0 absolute flex-col items-start justify-start">
              <Text>{transaction.date}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
