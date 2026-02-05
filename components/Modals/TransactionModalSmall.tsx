import EditIcon from "@/assets/ui/Edit.svg";
import AddIcon from "@/assets/ui/plus-large-svgrepo-com.svg";
import { useTheme } from "@/hooks/useTheme";
import { getContrastColor, withOpacity } from "@/utils/color";
import { formatDateToDayMonth, nowYear } from "@/utils/date";
import { Transaction } from "@/utils/types/transactions";
import { useRouter } from "expo-router";
import React from "react";
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
              <View
                style={{
                  backgroundColor: transaction.category.color,
                }}
                className="w-full p-2 relative gap-2 items-start justify-start"
              >
                <View
                  className="border-[2px] border-solid rounded-full items-center justify-center p-3 absolute top-[-24px] left-[12px]"
                  style={{
                    backgroundColor: theme.header,
                    borderColor: transaction.category.color,
                  }}
                >
                  <RenderIcon
                    name={transaction.category.icon}
                    width={36}
                    height={36}
                    color={getContrastColor(theme.header)}
                  />
                </View>
                <Text
                  style={{
                    color: getContrastColor(transaction.category.color),
                  }}
                  className="px-[72px] text-xl font-medium"
                >
                  {transaction.category?.name}
                </Text>
              </View>
              <View
                style={{ backgroundColor: theme.card }}
                className="flex-col items-start justify-start w-full gap-3 flex-1 p-4"
              >
                <View className="flex-col items-start justify-start gap-1">
                  <View className="flex-row w-full items-center justify-between">
                    <Text
                      style={{ color: theme.secondary }}
                      className="text-base font-medium"
                    >
                      Дата:
                    </Text>
                    <Text
                      style={{ color: theme.text }}
                      className="text-base font-medium"
                    >
                      {`${formatDateToDayMonth(transaction.date)} ${nowYear}`}
                    </Text>
                  </View>
                  <View className="flex-row w-full items-center justify-between">
                    <Text
                      style={{ color: theme.secondary }}
                      className="text-base font-medium"
                    >
                      Тип транзакции:
                    </Text>
                    <Text
                      style={{
                        color: transaction.type === 1 ? theme.red : theme.green,
                      }}
                      className="text-base font-medium"
                    >
                      {transaction.type === 1 ? "Расходы" : "Доходы"}
                    </Text>
                  </View>
                  <View className="flex-row w-full items-center justify-between">
                    <Text
                      style={{ color: theme.secondary }}
                      className="text-base font-medium"
                    >
                      Значение:
                    </Text>
                    <Text
                      style={{
                        color: transaction.type === 1 ? theme.red : theme.green,
                      }}
                      className="text-base font-medium"
                    >
                      {`${transaction.type === 1 ? "-" : "+"}${transaction.count} ₽`}
                    </Text>
                  </View>
                </View>
                <View className="flex-row w-full items-center justify-between">
                  {transaction.note ? (
                    <View className="flex-col items-start justify-start w-full">
                      <Text
                        style={{ color: theme.secondary }}
                        className="text-base font-medium"
                      >
                        Заметка:
                      </Text>
                      <Text
                        style={{
                          color: withOpacity(theme.text, 0.7),
                        }}
                        className="text-base font-medium"
                      >
                        {transaction.note}
                      </Text>
                    </View>
                  ) : (
                    <View className="w-full flex-row items-center justify-between">
                      <Text
                        style={{
                          color: transaction.note
                            ? theme.text
                            : theme.secondary,
                        }}
                        className="text-base font-medium"
                      >
                        {transaction.note || "Заметка отсутствует..."}
                      </Text>
                      <TouchableOpacity>
                        <AddIcon
                          width={20}
                          height={20}
                          color={theme.secondary}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
              <View
                style={{ backgroundColor: theme.header }}
                className="flex-col items-start justify-start w-full gap-3 flex-1 p-4"
              >
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/edit-transaction",
                      params: {
                        transaction: JSON.stringify(transaction),
                      },
                    })
                  }
                  className="flex-col items-center justify-center gap-1"
                >
                  <View
                    style={{ backgroundColor: theme.secondary }}
                    className="items-center justify-center p-3 rounded-full"
                  >
                    <EditIcon width={36} height={36} color={theme.text} />
                  </View>
                  <Text
                    style={{ color: theme.secondary }}
                    className="text-sm font-regular"
                  >
                    Изменить
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
