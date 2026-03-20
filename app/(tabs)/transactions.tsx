import CategoryComponent from "@/components/Categories/CategoryComponent";
import TransactionList from "@/components/Transactions/TransactionList";
import MonthHeader from "@/components/UI/headers/MonthHeader";
import {
  getTransactionsByCategoryAndDateAsync,
  getTransactionsByDateAsync,
} from "@/database/queries/transactions";
import { useTheme } from "@/hooks/useTheme";
import {
  getMonthYearByOffset,
  getMonthYearTitle,
  groupTransactionsByDate,
} from "@/utils/date";
import { Category } from "@/utils/types/categories";
import { Transaction } from "@/utils/types/transactions";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function TransactionsScreen() {
  const theme = useTheme();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const transactionsList = useMemo(
    () => groupTransactionsByDate(transactions),
    [transactions],
  );
  const [refreshFlag, setRefreshFlag] = useState(0);
  const [filtredCategory, setFiltredCategory] = useState<Category | null>(null);

  const [monthOffset, setMonthOffset] = useState(0);

  const monthTitle = useMemo(() => {
    const title = getMonthYearTitle(monthOffset);
    return title.charAt(0).toUpperCase() + title.slice(1);
  }, [monthOffset]);

  useFocusEffect(
    useCallback(() => {
      setRefreshFlag((prev) => prev + 1);
    }, []),
  );

  useEffect(() => {
    let isActive = true;
    const { month, year } = getMonthYearByOffset(monthOffset);

    const fetchTransactions = async () => {
      try {
        let data: Transaction[] = [];

        if (filtredCategory !== null) {
          data = await getTransactionsByCategoryAndDateAsync({
            categoryId: filtredCategory.id,
            month: month,
            year: year,
          });
        } else {
          data = await getTransactionsByDateAsync({ month: month, year: year });
        }

        if (isActive) setTransactions(data);
      } catch (error: unknown) {
        console.error(error);
      }
    };

    fetchTransactions();

    return () => {
      isActive = false;
    };
  }, [filtredCategory, refreshFlag, monthOffset]);

  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="flex-1 flex-col gap-2 items-start justify-start relative"
    >
      <MonthHeader
        monthTitle={monthTitle}
        setMonthOffset={setMonthOffset}
        theme={theme}
      />
      {transactionsList.length > 0 ? (
        <View className="px-4 flex-col items-start justify-start gap-1">
          {filtredCategory !== null ? (
            <Text
              style={{ color: theme.secondary }}
              className="text-xs font-medium"
            >
              Нажмите на выбранную категорию, чтобы очистить фильтры.
            </Text>
          ) : null}
          <View className="w-full flex-row gap-2 items-center">
            <Text
              style={{ color: theme.secondary }}
              className="text-sm font-medium"
            >
              Фильтры:
            </Text>
            {filtredCategory !== null ? (
              <TouchableOpacity onPress={() => setFiltredCategory(null)}>
                <CategoryComponent category={filtredCategory} />
              </TouchableOpacity>
            ) : (
              <Text
                style={{ color: theme.text }}
                className="text-sm font-medium"
              >
                Все категории
              </Text>
            )}
          </View>
        </View>
      ) : null}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className=" w-full flex-col gap-2"
      >
        {transactionsList.length > 0 ? (
          <TransactionList
            onRefresh={() => setRefreshFlag((prev) => prev + 1)}
            setFilter={(prev) => setFiltredCategory(prev)}
            data={transactionsList}
          />
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
