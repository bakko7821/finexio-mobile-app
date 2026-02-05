import GridIcon from "@/assets/ui/Grid.svg";
import ListIcon from "@/assets/ui/ListNested.svg";
import PlusIcon from "@/assets/ui/plus-large-svgrepo-com.svg";
import CategoryIcon from "@/components/category/CategoryIcon";
import BasicHeader from "@/components/Headers/BasicHeader";
import CategoryModal from "@/components/Modals/CategoryModal";
import CategoryModalSmall from "@/components/Modals/CategoryModalSmall";
import Nav from "@/components/Nav";
import Plug from "@/components/UI/Plug";
import { getCategoriesByType } from "@/db/categories";
import { getTransactionSumsByCategory } from "@/db/chart";
import { getTransactionsSumByMonthAndType } from "@/db/transactions";
import "@/global.css";
import { useTheme } from "@/hooks/useTheme";
import { withOpacity } from "@/utils/color";
import { nowMonth, nowYear } from "@/utils/date";
import { Category } from "@/utils/types/categories";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

export default function CategoryScreen() {
  const [type, setType] = useState(1);
  const router = useRouter();
  const theme = useTheme();

  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpenCategoryModal, setIsOpenCategoryModal] = useState(false);
  const [isOpenSmallCategoryModal, setIsOpenSmallCategoryModal] =
    useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  const [renderType, setRenderType] = useState("grid");

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let active = true;

      const load = async () => {
        try {
          const data = await getCategoriesByType(type);
          if (active) setCategories(data);

          setLoadingCategories(false);
        } catch (e) {
          console.error("Ошибка загрузки категорий", e);
        }
      };

      load();

      return () => {
        active = false;
      };
    }, [type]),
  );

  const [data, setData] = useState<any[]>([]);
  const [refreshFlag, setRefreshFlag] = useState(0);

  const triggerRefresh = () => setRefreshFlag((prev) => prev + 1);

  useEffect(() => {
    try {
      const fetchChart = async () => {
        const sumsByCategory = await getTransactionSumsByCategory(
          nowMonth,
          nowYear,
          type,
        );

        const chartData = sumsByCategory.map((item) => ({
          value: item.count,
          color: item.category.color,
          text: item.category.name,
        }));

        setData(chartData);
        setLoadingChart(false);
      };

      fetchChart();
    } catch (error: unknown) {
      console.error(error);
    }
  }, [type, refreshFlag]);

  const [currentSum, setCurrentSum] = useState(0);
  const [oppositeSum, setOppositeSum] = useState(0);
  const isExpense = type === 1;
  const currentLabel = `${isExpense ? "-" : "+"}${currentSum} ₽`;
  const oppositeLabel = `${isExpense ? "+" : "-"}${oppositeSum} ₽`;

  useEffect(() => {
    const loadSums = async () => {
      const current = await getTransactionsSumByMonthAndType(
        nowMonth,
        nowYear,
        type,
      );

      const opposite = await getTransactionsSumByMonthAndType(
        nowMonth,
        nowYear,
        type === 1 ? 2 : 1,
      );

      setCurrentSum(current);
      setOppositeSum(opposite);
      setLoadingChart(false);
    };

    loadSums();
  }, [type, refreshFlag]);

  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="w-full flex-1 items-center"
    >
      <BasicHeader title="Категории" />
      <View className="flex-1 w-full flex-col p-3 gap-2 relative">
        <View className="flex-col gap-1 w-full">
          <View className="flex-col items-start w-full">
            <Text
              style={{ color: theme.text }}
              className="text-base font-semibold"
            >
              График
            </Text>
            <Text
              style={{ color: theme.secondary }}
              className="text-xs font-medium"
            >
              Чтобы указать {type === 1 ? "доходы" : "расходы"}, нажмите в центр
              графика.
            </Text>
          </View>
          <View className="w-full justify-center items-center p-2">
            {loadingChart && (
              <Text
                style={{ color: theme.secondary }}
                className="w-full text-sm font-medium"
              >
                Загрузка графика...
              </Text>
            )}

            {!loadingChart && (
              <PieChart
                data={data}
                donut
                radius={120}
                innerRadius={100}
                centerLabelComponent={() => (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setType((prev) => (prev === 1 ? 2 : 1))}
                    style={{
                      backgroundColor: theme.card,
                    }}
                    className="flex-col gap-1 items-center justify-center rounded-full w-[200px] h-[200px]"
                  >
                    <Text
                      style={{ color: theme.text }}
                      className="text-xl font-medium"
                    >
                      {type === 1 ? "Расходы" : "Доходы"}
                    </Text>
                    <Text
                      style={{ color: type === 1 ? theme.red : theme.green }}
                      className="text-xl font-medium"
                    >
                      {currentLabel}
                    </Text>
                    <Text
                      style={{ color: type === 1 ? theme.green : theme.red }}
                      className="text-sm font-medium"
                    >
                      {oppositeLabel}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>
        <Plug />
        <View className="w-full flex-col gap-2 flex-1">
          <View className="flex-row items-center justify-between w-full relative">
            <Text
              style={{ color: theme.text }}
              className="text-base font-semibold"
            >
              Категории
            </Text>
            <TouchableOpacity
              onPress={() =>
                setRenderType((prev) => (prev === "grid" ? "list" : "grid"))
              }
            >
              {renderType === "grid" && (
                <ListIcon width={24} height={24} color={theme.secondary} />
              )}
              {renderType === "list" && (
                <GridIcon width={24} height={24} color={theme.secondary} />
              )}
            </TouchableOpacity>
          </View>
          {loadingCategories && (
            <Text
              style={{ color: theme.secondary }}
              className="w-full text-sm font-medium px-2"
            >
              Загрузка категорий...
            </Text>
          )}

          {!loadingCategories && categories?.length >= 1 && (
            <View className="w-full flex-1">
              {renderType === "grid" && (
                <View className="flex-row flex-wrap gap-2 items-center justify-start">
                  {categories.map((category) => (
                    <CategoryIcon
                      key={category.id}
                      category={category}
                      onSelect={setSelectedCategory}
                      onOpen={setIsOpenCategoryModal}
                      isOpen={isOpenCategoryModal}
                      isOpenSmallPanel={isOpenSmallCategoryModal}
                      onOpenSmallPanel={setIsOpenSmallCategoryModal}
                      renderType={renderType}
                    />
                  ))}
                </View>
              )}
              {renderType === "list" && (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 4, gap: 4 }}
                >
                  {categories.map((category) => (
                    <CategoryIcon
                      key={category.id}
                      category={category}
                      onSelect={setSelectedCategory}
                      onOpen={setIsOpenCategoryModal}
                      isOpen={isOpenCategoryModal}
                      isOpenSmallPanel={isOpenSmallCategoryModal}
                      onOpenSmallPanel={setIsOpenSmallCategoryModal}
                      renderType={renderType}
                    />
                  ))}
                </ScrollView>
              )}
            </View>
          )}

          {!loadingCategories && categories?.length <= 0 && (
            <Text
              style={{ color: theme.secondary }}
              className="w-full text-sm font-medium px-2"
            >
              У вас отсутствуют категории
            </Text>
          )}
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: withOpacity(theme.secondary, 0.4),
            borderColor: theme.secondary,
            zIndex: 999,
          }}
          className="flex items-center justify-center border-dashed border-[2px] p-2 rounded-full absolute bottom-3 left-3"
          onPress={() =>
            router.push({
              pathname: "/create-category",
              params: {
                type: String(type),
              },
            })
          }
        >
          <PlusIcon width={36} height={36} color={theme.secondary} />
        </TouchableOpacity>
      </View>
      <Nav />
      {isOpenCategoryModal && (
        <CategoryModal
          category={selectedCategory}
          visible={isOpenCategoryModal}
          onClose={() => setIsOpenCategoryModal(false)}
          type={type}
          onTransactionAdded={triggerRefresh}
        />
      )}
      {isOpenSmallCategoryModal && (
        <CategoryModalSmall
          category={selectedCategory}
          visible={isOpenSmallCategoryModal}
          onClose={() => setIsOpenSmallCategoryModal(false)}
          type={type}
        />
      )}
    </View>
  );
}
