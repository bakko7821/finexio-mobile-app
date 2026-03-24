import GridIcon from "@/assets/ui/Grid.svg";
import ListIcon from "@/assets/ui/ListOrdered.svg";
import PlusIcon from "@/assets/ui/Plus.svg";
import CategoriesList from "@/components/Categories/CategoriesList";
import DonutChart from "@/components/charts/donut/DonutChart";
import MonthHeader from "@/components/UI/headers/MonthHeader";
import CreateCategoryModal from "@/components/UI/modals/categories/CreateCategory";
import Plug from "@/components/UI/Plug";
import { getCategoriesByType } from "@/database/queries/categories";
import { getChartData, getSumByType } from "@/database/queries/chart";
import { useTheme } from "@/hooks/useTheme";
import { getMonthYearByOffset, getMonthYearTitle } from "@/utils/date";
import { Category } from "@/utils/types/categories";
import { PieItem } from "@/utils/types/chart";
import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
// import { PieChart } from "react-native-gifted-charts";

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
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [categoriesType, refreshFlag]);

  const [monthOffset, setMonthOffset] = useState(0);

  useEffect(() => {
    const { month, year } = getMonthYearByOffset(monthOffset);

    const fetchPieChartData = async () => {
      try {
        setLoadingChartInfo(true);

        const data = await getChartData({
          type: categoriesType,
          month,
          year,
        });

        setChartInfo(data);

        setExpensive(await getSumByType({ type: 1, month, year }));
        setIncome(await getSumByType({ type: 2, month, year }));
      } catch (error: unknown) {
        console.error(error);
      } finally {
        setLoadingChartInfo(false);
      }
    };

    fetchPieChartData();
  }, [categoriesType, refreshFlag, monthOffset]);

  const monthTitle = useMemo(() => {
    const title = getMonthYearTitle(monthOffset);
    return title.charAt(0).toUpperCase() + title.slice(1);
  }, [monthOffset]);

  const chartAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(chartAnim, {
      toValue: loadingChartInfo ? 0.8 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [chartAnim, loadingChartInfo]);

  const categoriesAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(categoriesAnim, {
      toValue: loadingCategories ? 0.3 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [categoriesAnim, loadingCategories]);

  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="flex-1 flex-col gap-2 items-start justify-start relative"
    >
      <TouchableOpacity
        style={{
          borderColor: theme.secondary,
          backgroundColor: theme.header,
          zIndex: 999,
        }}
        onPress={() => setIsVisibleCreateCategoryModal(true)}
        className="items-center justify-center absolute bottom-[0px] left-[16px] p-2 rounded-full border-[2px] border-dashed"
      >
        <PlusIcon width={32} height={32} color={theme.text} />
      </TouchableOpacity>
      <MonthHeader
        monthTitle={monthTitle}
        setMonthOffset={setMonthOffset}
        theme={theme}
      />
      <View className="flex-col flex-1 w-full gap-2 px-4">
        <View>
          <Text style={{ color: theme.text }} className="text-lg font-medium">
            Статистика
          </Text>
          <Text
            style={{ color: theme.secondary }}
            className="text-sm font-medium"
          >
            Нажимите в центр графика чтобы указать{" "}
            {categoriesType === 1 ? "доходы" : "расходы"}.
          </Text>
        </View>
        <Animated.View
          style={{
            opacity: chartAnim,
            transform: [
              {
                scale: chartAnim.interpolate({
                  inputRange: [0.8, 1],
                  outputRange: [0.96, 1],
                }),
              },
            ],
          }}
          className="w-full justify-center flex-1 items-center"
        >
          {loadingChartInfo && (
            <View className="absolute inset-0 items-center justify-center">
              <Text
                style={{ color: theme.secondary }}
                className="text-sm font-medium"
              >
                Загрузка...
              </Text>
            </View>
          )}

          <DonutChart
            key={JSON.stringify(chartInfo)}
            data={chartInfo}
            size={200}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setCategoriesType((prev) => (prev === 1 ? 2 : 1))}
              className="rounded-full absolute items-center justify-center"
              style={{
                zIndex: 999,
                backgroundColor: theme.header,
                width: 140,
                height: 140,
              }}
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
                {categoriesType === 1 ? `-d${expensive}` : `+${income}`} ₽
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
          </DonutChart>

          {/* <CustomChart
            data={chartInfo}
            changeType={() => setCategoriesType((prev) => (prev === 1 ? 2 : 1))}
          /> */}

          {/* <PieChart
            data={chartInfo}
            donut
            radius={110}
            innerRadius={80}
            isAnimated
            animationDuration={800}
            centerLabelComponent={() => (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() =>
                  setCategoriesType((prev) => (prev === 1 ? 2 : 1))
                }
                style={{
                  backgroundColor: theme.card,
                }}
                className="flex-col items-center justify-center rounded-full w-[170px] h-[170px]"
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
          /> */}
        </Animated.View>
      </View>
      <Plug />
      <View className="flex-col w-full gap-2 flex-1">
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
        <Animated.View
          style={{
            flex: 1,
            opacity: categoriesAnim,
            transform: [
              {
                scale: categoriesAnim.interpolate({
                  inputRange: [0.3, 1],
                  outputRange: [0.96, 1],
                }),
              },
            ],
          }}
          className="w-full px-4"
        >
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
        </Animated.View>
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
