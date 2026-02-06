import CategoryComponent from "@/components/category/CategoryComponent";
import BasicHeader from "@/components/Headers/BasicHeader";
import Nav from "@/components/Nav";
import TransactionsList from "@/components/transaction/TransactionsList";
import {
  getAllTransactions,
  getTransactionsByCategoryId,
} from "@/db/transactions";
import "@/global.css";
import { useTheme } from "@/hooks/useTheme";
import { Category } from "@/utils/types/categories";
import { Transaction } from "@/utils/types/transactions";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function ReceiptScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { filter } = useLocalSearchParams<{ filter?: string }>();
  const [currentFilter, setCurrentFilter] = useState<Category | null>(
    filter ? JSON.parse(filter) : null,
  );

  const theme = useTheme();

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);

      try {
        const data = currentFilter
          ? await getTransactionsByCategoryId(currentFilter.id)
          : await getAllTransactions();

        setTransactions(data);
      } catch (e) {
        console.error("Failed to load transactions:", e);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [currentFilter]);

  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="w-full h-full items-center justify-between"
    >
      <BasicHeader title="Операции" />
      <View className="flex-1 flex-col items-start justify-start w-full p-3 gap-3">
        {loading && (
          <Text
            style={{ color: theme.secondary }}
            className="text-sm font-medium px-2"
          >
            Загрузка...
          </Text>
        )}

        {!loading && transactions?.length >= 1 && (
          <View>
            {currentFilter && (
              <View className="flex-col items-start justify-start px-2 gap-1">
                <View className="flex-row items-center justify-start gap-2">
                  <Text
                    style={{ color: theme.secondary }}
                    className="text-sm font-medium"
                  >
                    Фильтры:
                  </Text>
                  <CategoryComponent
                    category={currentFilter}
                    isTouchale
                    handleTouch={() => setCurrentFilter(null)}
                  />
                </View>
                <Text
                  style={{ color: theme.secondary }}
                  className="w-full text-xs font-medium"
                >
                  Чтобы убрать категорию, нажмите на неё.
                </Text>
              </View>
            )}
            <TransactionsList transactions={transactions} />
          </View>
        )}

        {!loading && transactions?.length <= 0 && (
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
