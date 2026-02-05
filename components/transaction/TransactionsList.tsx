import { useTheme } from "@/hooks/useTheme";
import { groupTransactions, Transaction } from "@/utils/types/transactions";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import TransactionModalSmall from "../Modals/TransactionModalSmall";
import Plug from "../UI/Plug";
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
  const [isOpenEditPanel, setIsOpenEditPanel] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const grouped = groupTransactions(transactions);
  const theme = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={grouped}
        keyExtractor={(item) => item.label}
        renderItem={({ item: group }) => (
          <View className="flex-col gap-2 ">
            <View className=" w-full mt-2 px-2 flex-row justify-between items-center">
              <Text
                style={{ color: theme.secondary }}
                className="text-base font-medium"
              >
                {group.label}
              </Text>
              <Text
                style={{
                  color: group.sum < 0 ? theme.red : theme.green,
                }}
                className="text-base font-bold"
              >
                {group.sum} ₽
              </Text>
            </View>
            <Plug />
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
                  setSelectedTransactions={setSelectedTransaction}
                  isOpenEditPanel={isOpenEditPanel}
                  onOpenEditPanel={setIsOpenEditPanel}
                />
              ))}
            </View>
          </View>
        )}
      />
      {isOpenEditPanel && (
        <TransactionModalSmall
          visible={isOpenEditPanel}
          onClose={() => setIsOpenEditPanel(false)}
          transaction={selectedTransaction}
        />
      )}
    </View>
  );
}
