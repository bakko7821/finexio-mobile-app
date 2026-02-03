import EditIcon from "@/assets/ui/Edit.svg";
import ReceiptIcon from "@/assets/ui/receipt-item-svgrepo-com.svg";
import { createTransaction } from "@/db/transactions";
import { useTheme } from "@/hooks/useTheme";
import { getContrastColor, withOpacity } from "@/utils/color";
import { Category } from "@/utils/types/categories";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { RenderIcon } from "../UI/RenderIcon";

interface MenuComponentProps {
  visible: boolean;
  onClose: () => void;
  category: Category | undefined;
  type: number;
}

export default function CategoryModalSmall({
  visible,
  onClose,
  category,
  type,
}: MenuComponentProps) {
  const theme = useTheme();
  const router = useRouter();
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
    } catch (e) {
      console.error("Ошибка создания транзакции", e);
    }
  };

  if (!category) return;

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
              <View
                style={{ backgroundColor: category?.color, minHeight: 120 }}
                className="w-full p-3 relative gap-2"
              >
                <View
                  className="border-[2px] border-solid rounded-full items-center justify-center p-3 absolute top-[-24px] right-[12px]"
                  style={{
                    backgroundColor: theme.header,
                    borderColor: category.color,
                  }}
                >
                  <RenderIcon
                    name={category.icon}
                    width={36}
                    height={36}
                    color={getContrastColor(theme.header)}
                  />
                </View>
                <Text
                  style={{ color: getContrastColor(category.color) }}
                  className="text-xl font-medium"
                >
                  {category?.name}
                </Text>
              </View>
              <View
                style={{ backgroundColor: theme.header }}
                className="p-3 w-full flex-row items-center justify-around"
              >
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/edit-category",
                      params: {
                        category: JSON.stringify(category),
                      },
                    })
                  }
                  className="flex-col items-center justify-center gap-1"
                >
                  <View
                    style={{ backgroundColor: theme.secondary }}
                    className="items-center justify-center p-2 rounded-full"
                  >
                    <EditIcon width={24} height={24} color={theme.text} />
                  </View>
                  <Text
                    style={{ color: theme.secondary }}
                    className="text-sm font-regular"
                  >
                    Изменить
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-col items-center justify-center gap-1">
                  <View
                    style={{ backgroundColor: theme.secondary }}
                    className="items-center justify-center p-2 rounded-full"
                  >
                    <EditIcon width={24} height={24} color={theme.text} />
                  </View>
                  <Text
                    style={{ color: theme.secondary }}
                    className="text-sm font-regular"
                  >
                    Бюджет
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-col items-center justify-center gap-1">
                  <View
                    style={{
                      backgroundColor: withOpacity(category?.color, 0.4),
                    }}
                    className="items-center justify-center p-2 rounded-full"
                  >
                    <ReceiptIcon
                      width={24}
                      height={24}
                      color={getContrastColor(
                        withOpacity(category?.color, 0.4),
                      )}
                    />
                  </View>
                  <Text
                    style={{
                      color: category.color,
                    }}
                    className="text-sm font-regular"
                  >
                    Операции
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
