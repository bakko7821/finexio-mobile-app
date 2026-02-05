import CrossIcon from "@/assets/ui/cross-svgrepo-com.svg";
import { createTransaction } from "@/db/transactions";
import { useTheme } from "@/hooks/useTheme";
import { Category } from "@/utils/types/categories";
import React, { useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import NumberInput from "../UI/NumberInput";
import CategoryComponent from "../category/CategoryComponent";

interface MenuComponentProps {
  visible: boolean;
  onClose: () => void;
  category: Category | undefined;
  type: number;
  onTransactionAdded?: () => void;
}

export default function CategoryModal({
  visible,
  onClose,
  category,
  type,
  onTransactionAdded,
}: MenuComponentProps) {
  const theme = useTheme();
  const [transactionValue, setTransactionValue] = useState("0");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  const postTransaction = async () => {
    if (!category) return;

    try {
      await createTransaction({
        categoryId: category.id,
        type: type,
        count: Number(transactionValue),
        note,
        date: date || new Date().toISOString(),
      });

      setTransactionValue("");
      setNote("");
      console.log("Транзакция создана ✅");
      onClose();

      onTransactionAdded?.();
    } catch (e) {
      console.error("Ошибка создания транзакции", e);
    }
  };

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
              <View className="flex-col w-full justify-start items-start gap-2">
                <Text
                  style={{ color: theme.secondary }}
                  className="text-sm font-medium"
                >
                  Выбранная категория:
                </Text>
                {category && <CategoryComponent category={category} fullsize />}
              </View>
              <View className="w-full flex-col gap-2">
                <View
                  style={{ backgroundColor: theme.secondary }}
                  className="w-full p-3 rounded-xl"
                >
                  <View className="flex-row gap-1 items-center justify-center">
                    <Text
                      style={{ color: type === 1 ? theme.red : theme.green }}
                      className="text-4xl font-medium"
                    >
                      {transactionValue}
                    </Text>
                    <Text
                      style={{ color: type === 1 ? theme.red : theme.green }}
                      className="text-sm font-regular"
                    >
                      ₽
                    </Text>
                  </View>
                </View>
                <View className="w-full">
                  <NumberInput
                    value={transactionValue}
                    setValue={setTransactionValue}
                    onRequest={postTransaction}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
