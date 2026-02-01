import { useTheme } from "@/hooks/useTheme";
import { groupTransactions, Transaction } from "@/utils/types/transactions";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
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

  const grouped = groupTransactions(transactions);
  const theme = useTheme();

  return (
    <FlatList
      data={grouped}
      keyExtractor={(item) => item.label}
      renderItem={({ item: group }) => (
        <View className="flex-col gap-2">
          <View className="w-full px-2 flex-row justify-between items-center">
            <Text
              style={{ color: theme.secondary }}
              className="text-base font-medium"
            >
              {group.label}
            </Text>
            <Text
              style={{
                color: group.sum < 0 ? "#780000" : "#00780E",
              }}
              className="text-base font-medium"
            >
              {group.sum} ₽
            </Text>
          </View>

          <View className="flex-col gap-1">
            {group.items.map((tx) => (
              <TransactionComponent
                key={tx.id}
                transaction={tx}
                isOpen={openTransactionId === tx.id}
                onToggle={() =>
                  setOpenTransactionId((prev) =>
                    prev === tx.id ? null : tx.id,
                  )
                }
              />
            ))}
          </View>
        </View>
      )}
    />
  );
}
