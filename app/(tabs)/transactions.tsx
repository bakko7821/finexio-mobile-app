import { getTransactions } from "@/database/queries/transactions";
import { useTheme } from "@/hooks/useTheme";
import { groupTransactionsByDate } from "@/utils/date";
import { Transaction } from "@/utils/transactions";
import { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";

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
  }, []);

  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="flex-1 items-center justify-center"
    >
      <Text className="text-xl font-bold text-green-500">
        Welcome to Transactions!
      </Text>
    </View>
  );
}
