import TransactionList from "@/components/Transactions/TransactionList";
import { getTransactions } from "@/database/queries/transactions";
import { useTheme } from "@/hooks/useTheme";
import { groupTransactionsByDate } from "@/utils/date";
import { Transaction } from "@/utils/transactions";
import { useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function TransactionsScreen() {
  const theme = useTheme();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const transactionsList = useMemo(
    () => groupTransactionsByDate(transactions),
    [transactions],
  );

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchTransactions = async () => {
        try {
          const data = await getTransactions();
          if (isActive) {
            setTransactions(data);
          }
        } catch (error: unknown) {
          console.error(error);
        }
      };

      fetchTransactions();

      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="pt-[50px] flex-1 flex-col gap-2 items-start justify-start relative"
    >
      <Text style={{ color: theme.text }} className="px-4 text-lg font-medium">
        Транзакции
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className=" w-full flex-col gap-2"
      >
        {transactionsList.length > 0 ? (
          <TransactionList data={transactionsList} />
        ) : (
          <Text
            style={{ color: theme.secondary }}
            className="text-sm font-medium px-4"
          >
            У вас отсутствуют транзакции.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
