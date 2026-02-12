import { useTheme } from "@/hooks/useTheme";
import { withOpacity } from "@/utils/colors";
import { GroupedTransactions } from "@/utils/transactions";
import { Text, View } from "react-native";
import TransactionComponent from "./TransactionComponent";

type TransactionListProps = {
  data: GroupedTransactions[];
};

export default function TransactionList({ data }: TransactionListProps) {
  const theme = useTheme();
  return (
    <View className=" w-full flex-col gap-2">
      {data.map((group, i) => (
        <View
          key={`${group.date}-${i}`}
          className="w-full flex-col gap-3 justify-center items-center "
        >
          <View
            className="flex-row w-full items-center justify-between p-4"
            style={{ backgroundColor: theme.card }}
          >
            <View className="flex-row gap-2 items-center justify-center">
              <Text
                style={{ color: theme.primary }}
                className="text-5xl font-regular"
              >
                {group.day}
              </Text>
              <View className="flex-col gap-0 items-start justify-start">
                <Text
                  style={{ color: theme.secondary }}
                  className="text-xs font-regulas"
                >
                  {group.label.toLocaleUpperCase("ru-RU")}
                </Text>
                <Text
                  style={{ color: withOpacity(theme.primary, 0.6) }}
                  className="text-base font-bold"
                >
                  {`${group.month} ${group.year}`.toLocaleUpperCase("ru-RU")}
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: group.groupedCount < 0 ? theme.red : theme.green,
              }}
              className="text-xl font-medium"
            >
              {group.groupedCount} ₽
            </Text>
          </View>
          <View className="flex-col gap-1 w-full px-2">
            {group.transactions.map((transaction, idx) => (
              <TransactionComponent
                key={`${transaction.categoryId}-${transaction.count}-${idx}`}
                transaction={transaction}
              />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}
