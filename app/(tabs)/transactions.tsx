import TransactionList from "@/components/Transactions/TransactionList";
import { getTransactions } from "@/database/queries/transactions";
import { useTheme } from "@/hooks/useTheme";
import { groupTransactionsByDate } from "@/utils/date";
import { Transaction } from "@/utils/transactions";
import { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";


export default function TransactionsScreen() {
  const theme = useTheme();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const transactionsList = useMemo(
    () => groupTransactionsByDate(transactions),
    [transactions],
  );

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (error: unknown) {
        console.error(error);
      }
    };

    fetchTransactions();
  }, [transactions]);

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
        <TransactionList data={transactionsList} />
      </ScrollView>
    </View>
  );
}
