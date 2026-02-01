import EditIcon from "@/assets/ui/Edit.svg";
import TrashIcon from "@/assets/ui/TrashAltSolid.svg";
import { useTheme } from "@/hooks/useTheme";
import { getContrastColor } from "@/utils/color";
import { Transaction } from "@/utils/types/transactions";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CategoryComponent from "../category/CategoryComponent";

interface TransactionComponentProps {
  transaction: Transaction;
  isOpen: boolean;
  onToggle: () => void;
}

export default function TransactionComponent({
  transaction,
  isOpen,
  onToggle,
}: TransactionComponentProps) {
  const theme = useTheme();
  return (
    <TouchableOpacity
      style={{ borderColor: transaction.category.color }}
      className="w-full flex-col gap-1 p-1 rounded-xl border-solid border-2"
      onPress={onToggle}
    >
      <View className="flex-row items-center justify-between">
        <CategoryComponent
          isOpen={true}
          category={transaction.category}
          width={120}
        />
        <View className="flex-row items-center justify-center gap-1">
          <Text
            style={{ color: transaction.type === 1 ? "#780000" : "#00780E" }}
            className="px-2 text-sm font-medium"
          >
            {transaction.type === 1
              ? `-${transaction.count} ₽`
              : `+${transaction.count} ₽`}
          </Text>
          {isOpen && (
            <View className="flex-row flex-row items-center justify-center gap-1">
              <TouchableOpacity
                className="rounded-lg p-1"
                style={{ backgroundColor: theme.secondary }}
              >
                <EditIcon width={24} height={24} color={theme.background} />
              </TouchableOpacity>
              <TouchableOpacity
                className="rounded-lg p-1"
                style={{ backgroundColor: "#780000" }}
              >
                <TrashIcon
                  width={24}
                  height={24}
                  color={getContrastColor("#780000")}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      {isOpen && (
        <View className="p-1 flex-row items-center justify-between">
          <Text
            className="text-xs font-regular"
            style={{ color: theme.secondary }}
          >
            {transaction.note || "Отсутствует комментарий"}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
