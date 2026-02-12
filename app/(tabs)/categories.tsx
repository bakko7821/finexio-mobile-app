import PlusIcon from "@/assets/ui/Plus.svg";
import Plug from "@/components/UI/Plug";
import { useTheme } from "@/hooks/useTheme";
import { Text, TouchableOpacity, View } from "react-native";

import ListIcon from "@/assets/ui/ListOrdered.svg";
import GridIcon from "@/assets/ui/SquareGrid2x2.svg";
import CategoriesList from "@/components/Categories/CategoriesList";
import CreateCategoryModal from "@/components/UI/modals/CreateCategory";
import { getChartData, getSumByType } from "@/database/chart";
import { getCategoriesByType } from "@/database/queries/categories";
import { Category } from "@/utils/categories";
import { PieItem } from "@/utils/chart";
import { getCurrentMonthAndYear } from "@/utils/date";
import { useEffect, useState } from "react";
import { PieChart } from "react-native-gifted-charts";

export default function CategoriesScreen() {
  const theme = useTheme();
  const [isList, setIsList] = useState(false);
  const [categoriesType, setCategoriesType] = useState(1);
  const [isVisibleCreateCategoryModal, setIsVisibleCreateCategoryModal] =
    useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [refreshFlag, setRefreshFlag] = useState(0);

  const [chartInfo, setChartInfo] = useState<PieItem[]>([]);
  const [loadingChartInfo, setLoadingChartInfo] = useState(true);
  const [income, setIncome] = useState(0);
  const [expensive, setExpensive] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategoriesByType(categoriesType);

        setCategories(data);
        setLoadingCategories(false);
      } catch (error: unknown) {
        console.error(error);
      }
    };

    fetchCategories();
  }, [categoriesType, refreshFlag]);

  useEffect(() => {
    const { month, year } = getCurrentMonthAndYear();

    const fetchPieChartData = async () => {
      try {
        const data = await getChartData({
          type: categoriesType,
          month: month,
          year: year,
        });
        setChartInfo(data);
        setLoadingChartInfo(false);

        setExpensive(await getSumByType(1));
        setIncome(await getSumByType(2));
      } catch (error: unknown) {
        console.error(error);
      }
    };

    fetchPieChartData();
  }, [categoriesType, refreshFlag]);

  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="pt-[50px] flex-1 flex-col gap-2 items-start justify-start relative"
    >
      <TouchableOpacity
        style={{
          borderColor: theme.secondary,
          backgroundColor: theme.header,
        }}
        onPress={() => setIsVisibleCreateCategoryModal(true)}
        className="items-center justify-center absolute bottom-[0px] left-[16px] p-2 rounded-full border-[2px] border-dashed"
      >
        <PlusIcon width={32} height={32} color={theme.text} />
      </TouchableOpacity>
      <View className="flex-col w-full gap-2">
        <View>
          <Text
            style={{ color: theme.text }}
            className="px-4 text-lg font-medium"
          >
            Статистика
          </Text>
          <Text
            style={{ color: theme.secondary }}
            className="text-sm font-medium px-4"
          >
            Нажимите в центр графика чтобы указать{" "}
            {categoriesType === 1 ? "доходы" : "расходы"}.
          </Text>
        </View>
        <View className="w-full p-4 justify-center items-center">
          {!loadingChartInfo ? (
            <PieChart
              data={chartInfo}
              donut
              radius={120}
              innerRadius={100}
              centerLabelComponent={() => (
                <TouchableOpacity
                  onPress={() =>
                    setCategoriesType((prev) => (prev === 1 ? 2 : 1))
                  }
                  style={{
                    backgroundColor: theme.card,
                  }}
                  className="flex-col items-center justify-center rounded-full w-[200px] h-[200px]"
                >
                  <Text
                    style={{ color: theme.text }}
                    className="text-xl font-medium"
                  >
                    {categoriesType === 1 ? "Расходы" : "Доходы"}
                  </Text>
                  <Text
                    style={{
                      color: categoriesType === 1 ? theme.red : theme.green,
                    }}
                    className="text-2xl font-medium"
                  >
                    {categoriesType === 1 ? `-${expensive}` : `+${income}`} ₽
                  </Text>
                  <Text
                    style={{
                      color: categoriesType === 1 ? theme.green : theme.red,
                      opacity: 0.4,
                    }}
                    className="text-base font-medium"
                  >
                    {categoriesType === 1 ? `+${income}` : `-${expensive}`} ₽
                  </Text>
                </TouchableOpacity>
              )}
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
      <Plug />
      <View className="flex-col w-full gap-2">
        <View className="px-4 flex-row w-full items-center justify-between">
          <Text style={{ color: theme.text }} className="text-lg font-medium">
            Категории
          </Text>
          <TouchableOpacity onPress={() => setIsList((prev) => !prev)}>
            {isList ? (
              <ListIcon width={24} height={24} color={theme.secondary} />
            ) : (
              <GridIcon width={24} height={24} color={theme.secondary} />
            )}
          </TouchableOpacity>
        </View>
        <View className="w-full px-4">
          {!loadingCategories ? (
            <CategoriesList
              onRefresh={() => setRefreshFlag((prev) => prev + 1)}
              categories={categories}
              list={isList}
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
      <CreateCategoryModal
        title="Новая категория"
        visible={isVisibleCreateCategoryModal}
        onClose={() => setIsVisibleCreateCategoryModal(false)}
        onRefresh={() => setRefreshFlag((prev) => prev + 1)}
      />
    </View>
  );
}
