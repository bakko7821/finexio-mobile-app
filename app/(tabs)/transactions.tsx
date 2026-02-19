import SearchIcon from "@/assets/ui/Search.svg";
import CategoryComponent from "@/components/Categories/CategoryComponent";
import TransactionList from "@/components/Transactions/TransactionList";
import { getAllTransactionsByCategory, getTransactions } from "@/database/queries/transactions";
import { useTheme } from "@/hooks/useTheme";
import { Category } from "@/utils/categories";
import { groupTransactionsByDate } from "@/utils/date";
import { Transaction } from "@/utils/transactions";
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
  const [filtredCategory, setFiltredCategory] = useState<Category | null>(null)


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

  useEffect(() => {
    let isActive = true;

    const fetchTransactions = async () => {
      try {
        let data: Transaction[] = [];

        if (filtredCategory !== null) {
          data = await getAllTransactionsByCategory({ categoryId: filtredCategory.id });
        } else {
          data = await getTransactions();
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
  }, [filtredCategory, refreshFlag]);


  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="flex-1 flex-col gap-2 items-start justify-start relative"
    >
      <View style={{backgroundColor: theme.header}} className="flex-col items-start justify-start gap-1 pt-[50px] p-4 w-full">
        <View className="w-full flex-row items-center justify-between">
          <Text style={{ color: theme.text }} className="text-lg font-medium">
            Транзакции
          </Text>
          <TouchableOpacity onPress={() => alert("Пока в разработке!")}>
            <SearchIcon width={24} height={24} color={theme.secondary} />
          </TouchableOpacity>
        </View>
        <View className="w-full flex-row gap-2 items-center">
          <Text style={{color: theme.secondary}} className="text-lg font-medium">Фильтры:</Text>
          {filtredCategory !== null ? (
            <TouchableOpacity onPress={() => setFiltredCategory(null)}>
              <CategoryComponent smallIcon category={filtredCategory} />
            </TouchableOpacity>
          ) : (
            <Text style={{color: theme.text}} className="text-lg font-medium">Все категории</Text>
          )}
        </View>
      </View> 
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className=" w-full flex-col gap-2"
      >
        {transactionsList.length > 0 ? (
          <TransactionList
            onRefresh={() => setRefreshFlag((prev) => prev + 1)}
            setFilter={((prev) => setFiltredCategory(prev))}
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
