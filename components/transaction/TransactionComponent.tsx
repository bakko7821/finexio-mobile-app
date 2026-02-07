import { useTheme } from "@/hooks/useTheme";
import { getContrastColor } from "@/utils/color";
import { Transaction } from "@/utils/types/transactions";
import React, { Dispatch, SetStateAction } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { RenderIcon } from "../UI/RenderIcon";

interface TransactionComponentProps {
  transaction: Transaction;
  isOpen: boolean;
  onToggle: () => void;
  isOpenEditPanel: boolean;
  onOpenEditPanel: Dispatch<SetStateAction<boolean>>;
  setSelectedTransactions: (transaction: Transaction) => void;
}

export default function TransactionComponent({
  transaction,
  isOpen,
  onToggle,
  isOpenEditPanel,
  onOpenEditPanel,
  setSelectedTransactions,
}: TransactionComponentProps) {
  const theme = useTheme();
  return (
    <TouchableOpacity
      className="w-full flex-col gap-1 p-1 rounded-xl"
      onPress={() => {
        if (!isOpenEditPanel) {
          setSelectedTransactions(transaction);
          onOpenEditPanel(true);
        }
      }}
      delayLongPress={400}
    >
      <View className="flex-row items-start justify-start w-full gap-2">
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
        <View className="flex-1 flex-col items-start justify-start">
          <View className="w-full flex-row items-center justify-between">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-base font-medium flex-shrink"
              style={{ color: theme.text }}
            >
              {transaction.category.name}
              {transaction.smallCategory
                ? ` (${transaction.smallCategory.name})`
                : ""}
            </Text>

            <Text
              style={{
                color: transaction.type === 1 ? theme.red : theme.green,
              }}
              className="px-2 text-sm font-medium"
            >
              {transaction.type === 1
                ? `-${transaction.count} ₽`
                : `+${transaction.count} ₽`}
            </Text>
          </View>
          <View className="flex-row w-full items-center justify-start gap-1">
            {transaction.category.isGas && (
              <Text
                style={{ color: theme.secondary }}
                className="text-sm font-regular"
              >{`${transaction.category.gasSettings?.gasType} (${transaction.gasValue || 0} литров)`}</Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
