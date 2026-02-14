import { useTheme } from "@/hooks/useTheme";
import { getContrastColor } from "@/utils/colors";
import { Transaction } from "@/utils/transactions";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { RenderIcon } from "../UI/RenderIcon";
import InfoTransactionModal from "../UI/modals/transactions/InfoTransactionModal";

interface TransactionComponentProps {
  transaction: Transaction;
  isArchive?: boolean;
}
export default function TransactionComponent({
  transaction,
  isArchive = false,
}: TransactionComponentProps) {
  const [isOpenTransactionInfoModal, setIsOpenTransactionInfoModal] =
    useState(false);
  const theme = useTheme();

  return (
    <View className="relative overflow-hidden rounded-xl">
      <TouchableOpacity
        style={{ opacity: isArchive ? 0.5 : 1 }}
        className="w-full p-2 flex-row items-center justify-between"
        onPress={() => setIsOpenTransactionInfoModal(true)}
      >
        {/* контент */}
        <View className="flex-row items-start gap-2">
          <View
            style={{ backgroundColor: transaction.category.color }}
            className="p-2 items-center justify-center rounded-full"
          >
            <RenderIcon
              name={transaction.category.icon}
              width={24}
              height={24}
              color={getContrastColor(transaction.category.color)}
            />
          </View>

          <View>
            <Text
              style={{
                color: theme.text,
                textDecorationLine: isArchive ? "line-through" : "none",
              }}
              className="text-base font-medium"
            >
              {transaction.category.name}
            </Text>
            <Text
              style={{
                color: theme.secondary,
              }}
              className="text-sm"
            >
              {isArchive
                ? "Категория архивированна"
                : transaction.note || "Заметка отсутствует..."}
            </Text>
          </View>
        </View>

        <Text
          className="text-base font-medium"
          style={{
            color: transaction.category.type === 1 ? theme.red : theme.green,
            textDecorationLine: isArchive ? "line-through" : "none",
          }}
        >
          {transaction.category.type === 1 ? "-" : "+"}
          {transaction.count} ₽
        </Text>
      </TouchableOpacity>
      <InfoTransactionModal
        visible={isOpenTransactionInfoModal}
        onClose={() => setIsOpenTransactionInfoModal(false)}
        transaction={transaction}
        // onRefresh={}
      />
    </View>
  );
}
