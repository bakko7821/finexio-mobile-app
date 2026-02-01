import BasicHeader from "@/components/Headers/BasicHeader";
import Nav from "@/components/Nav";
import { getAllTransactions } from "@/db/transactions";
import "@/global.css";
import { Transaction } from "@/utils/types/transactions";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function ReceiptScreen() {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await getAllTransactions();
      setTransactions(data);
      console.log(data);
    };

    fetchTransactions();
  }, []);

  return (
    <View className="w-full h-full items-center justify-between">
      <BasicHeader />
      <View className="flex-1 w-full bg-blue-700">
        {transactions?.map((transaction) => (
          <View
            key={transaction.id}
            style={{ backgroundColor: transaction.category.color }}
          >
            <Text>{transaction.count}</Text>
          </View>
        ))}
      </View>
      <Nav />
    </View>
  );
}
