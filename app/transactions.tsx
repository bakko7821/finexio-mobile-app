import BasicHeader from "@/components/Headers/BasicHeader";
import Nav from "@/components/Nav";
import TransactionsList from "@/components/transaction/TransactionsList";
import { getAllTransactions } from "@/db/transactions";
import "@/global.css";
import { useTheme } from "@/hooks/useTheme";
import { Transaction } from "@/utils/types/transactions";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function ReceiptScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await getAllTransactions();
      setTransactions(data);
      console.log(data);
    };

    fetchTransactions();
  }, []);

  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="w-full h-full items-center justify-between"
    >
      <BasicHeader />
      <View className="flex-1 w-full p-3 gap-2">
        {transactions?.length >= 1 ? (
          <TransactionsList transactions={transactions} />
        ) : (
          <Text
            style={{ color: theme.secondary }}
            className="text-sm font-medium"
          >
            У вас отсутствуют транзакции.
          </Text>
        )}
      </View>
      <Nav />
    </View>
  );
}
