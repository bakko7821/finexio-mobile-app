import { Transaction } from "@/utils/types/transactions";
import React, { useState } from "react";
import { FlatList, View } from "react-native";
import TransactionComponent from "./TransactionComponent";

interface TransactionsListProps {
  transactions: Transaction[];
}

export default function TransactionsList({
  transactions,
}: TransactionsListProps) {
  const [openTransactionId, setOpenTransactionId] = useState<number | null>(
    null,
  );

  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
      data={transactions}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TransactionComponent
          transaction={item}
          isOpen={openTransactionId === item.id}
          onToggle={() => {
            setOpenTransactionId((prev) => (prev === item.id ? null : item.id));
          }}
        />
      )}
    />
  );
}
