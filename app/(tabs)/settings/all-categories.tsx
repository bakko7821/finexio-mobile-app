import CategoriesList from "@/components/Categories/CategoriesList";
import SettingsHeader from "@/components/UI/headers/SettingsHeader";
import Plug from "@/components/UI/Plug";
import { getCategoriesByTypeAll } from "@/database";
import { useTheme } from "@/hooks/useTheme";
import { Category } from "@/utils/types/categories";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function AllCategoriesScreen() {
  const theme = useTheme();
  const [incomeCategories, setIncomeCategories] = useState<Category[]>([]);
  const [expensiveCategories, setExpensiveCategories] = useState<Category[]>(
    [],
  );
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [refreshFlag, setRefreshFlag] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const incomeData = await getCategoriesByTypeAll(2);
        setIncomeCategories(incomeData);

        const expensiveData = await getCategoriesByTypeAll(1);
        setExpensiveCategories(expensiveData);

        console.log(expensiveData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [refreshFlag]);

  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="flex-1 flex-col gap-2"
    >
      <SettingsHeader title="Все категории" />
      <View className="w-full flex-1 flex-col gap-3">
        <View className="flex-col gap-2">
          <Text
            style={{ color: theme.secondary }}
            className="text-xl font-medium px-4"
          >
            Доходы
          </Text>
          <Plug />
          <View className="w-full px-4">
            {!loadingCategories ? (
              <CategoriesList
                categories={incomeCategories}
                list={false}
                onRefresh={() => setRefreshFlag((prev) => prev + 1)}
              />
            ) : (
              <Text
                style={{ color: theme.secondary }}
                className="text-sm font-medium"
              >
                Загрузка категорий...
              </Text>
            )}
          </View>
        </View>
        <View className="flex-col gap-2">
          <Text
            style={{ color: theme.secondary }}
            className="text-xl font-medium px-4"
          >
            Расходы
          </Text>
          <Plug />
          <View className="w-full px-4">
            {!loadingCategories ? (
              <CategoriesList
                categories={expensiveCategories}
                list={false}
                onRefresh={() => setRefreshFlag((prev) => prev + 1)}
              />
            ) : (
              <Text
                style={{ color: theme.secondary }}
                className="text-sm font-medium"
              >
                Загрузка категорий...
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
