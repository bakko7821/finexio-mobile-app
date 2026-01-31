import CrossIcon from "@/assets/ui/cross-svgrepo-com.svg";
import { useTheme } from "@/hooks/useTheme";
import { Category } from "@/utils/types/categories";
import React, { useState } from "react";
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CategoryComponent from "../category/CategoryComponent";
import NumberInput from "../UI/NumberInput";

interface MenuComponentProps {
  visible: boolean;
  onClose: () => void;
  category: Category | undefined;
  type: number;
}

export default function CategoryModal({
  visible,
  onClose,
  category,
  type,
}: MenuComponentProps) {
  const theme = useTheme();
  const [transactionValue, setTransactionValue] = useState("0");

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
              style={{ backgroundColor: theme.card }}
              className="rounded-t-3xl flex-1 w-full bottom-0 absolute p-3 flex-col items-start justify-start gap-2"
            >
              <View className="w-full flex-row items-center justify-between">
                <Text
                  style={{ color: theme.text }}
                  className="text-base font-medium"
                >
                  Новая транзакция ({type === 1 ? "Расходы" : "Доходы"})
                </Text>
                <TouchableOpacity onPress={onClose}>
                  <CrossIcon width={24} height={24} color={theme.text} />
                </TouchableOpacity>
              </View>
              <View className="flex-row w-full justify-between items-center">
                <Text
                  style={{ color: theme.secondary }}
                  className="text-sm font-medium"
                >
                  Выбранная категория:
                </Text>
                {category && (
                  <CategoryComponent category={category} isOpen={true} />
                )}
              </View>
              <View className="flex-row w-full justify-between items-center">
                <Text
                  style={{ color: theme.secondary }}
                  className="text-sm font-medium"
                >
                  Тип транзакции:
                </Text>
                <Text
                  className="text-base font-regular"
                  style={{ color: type === 1 ? "#780000" : "#00780E" }}
                >
                  {type === 1 ? "Расходы" : "Доходы"}
                </Text>
              </View>
              <View className="w-full flex-col gap-2">
                <View
                  style={{ backgroundColor: theme.secondary }}
                  className="w-full p-1 rounded-xl"
                >
                  <View className="flex-row gap-1 items-center justify-center">
                    <TextInput
                      value={transactionValue}
                      onChangeText={setTransactionValue}
                      style={{ color: type === 1 ? "#780000" : "#00780E" }}
                      className="text-4xl font-medium"
                    />
                    <Text
                      style={{ color: type === 1 ? "#780000" : "#00780E" }}
                      className="text-sm font-regular"
                    >
                      ₽
                    </Text>
                  </View>
                </View>
                <View className="w-full">
                  <NumberInput />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
