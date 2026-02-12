import { useTheme } from "@/hooks/useTheme";
import { getContrastColor } from "@/utils/colors";
import { Transaction } from "@/utils/transactions";
import { Text, TouchableOpacity, View } from "react-native";
import { RenderIcon } from "../UI/RenderIcon";

interface TransactionComponentProps {
  transaction: Transaction;
}
export default function TransactionComponent({
  transaction,
}: TransactionComponentProps) {
  const theme = useTheme();
  return (
    <TouchableOpacity className="w-full p-0 flex-row items-center justify-between">
      <View className="flex-row items-start justify-center gap-2">
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
        <View className="flex-col  items-start justify-start">
          <Text style={{ color: theme.text }} className="text-base font-medium">
            {transaction.category.name}
          </Text>
          {transaction.category.isGas && (
            <Text
              style={{ color: transaction.category.color }}
              className="text-sm font-medium"
            >
              {transaction.category.gasType}{" "}
              <Text style={{ color: theme.secondary }} className="font-regular">
                ({transaction.gasValue} x {transaction.category.gasPrice} ₽)
              </Text>
            </Text>
          )}
          {transaction.note && !transaction.category.isGas && (
            <Text
              style={{ color: theme.secondary }}
              className="text-sm font-regular"
            >
              {transaction.note}
            </Text>
          )}
        </View>
      </View>
      <Text
        className="text-base font-medium"
        style={{
          color: transaction.category.type === 1 ? theme.red : theme.green,
        }}
      >
        {transaction.category.type === 1 ? "-" : "+"}
        {transaction.count} ₽
      </Text>
    </TouchableOpacity>
  );
}
