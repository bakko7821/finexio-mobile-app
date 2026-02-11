import PlusIcon from "@/assets/ui/Plus.svg";
import Plug from "@/components/UI/Plug";
import { useTheme } from "@/hooks/useTheme";
import { Text, TouchableOpacity, View } from "react-native";

import ListIcon from "@/assets/ui/ListOrdered.svg";
import GridIcon from "@/assets/ui/SquareGrid2x2.svg";
import CategoriesList from "@/components/CategoriesList";
import CreateCategoryModal from "@/components/UI/modals/CreateCategory";
import { getCategoriesByType } from "@/database/queries/categories";
import { Category } from "@/utils/categories";
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

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const data = await getCategoriesByType(categoriesType);
        if (isMounted) {
          setCategories(data);
          setLoadingCategories(false);
        }

        console.log(categories);
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [categoriesType]);

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
            Статистика{" "}
            <Text
              style={{ color: categoriesType === 1 ? theme.red : theme.green }}
            >
              {categoriesType === 1 ? "расходов" : "доходов"}
            </Text>
          </Text>
          <Text
            style={{ color: theme.secondary }}
            className="text-sm font-medium px-4"
          >
            Нажимите в центр графика чтобы указать{" "}
            {categoriesType === 1 ? "доходы" : "расходы"}.
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setCategoriesType((prev) => (prev === 1 ? 2 : 1))}
          className="w-full p-4 justify-center items-center"
        >
          <PieChart
            data={[]}
            donut
            radius={120}
            innerRadius={100}
            centerLabelComponent={() => (
              <View
                style={{
                  backgroundColor: theme.card,
                }}
                className="flex-col gap-1 items-center justify-center rounded-full w-[200px] h-[200px]"
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
                  className="text-xl font-medium"
                >
                  123
                </Text>
                <Text
                  style={{
                    color: categoriesType === 1 ? theme.green : theme.red,
                  }}
                  className="text-sm font-medium"
                >
                  456
                </Text>
              </View>
            )}
          />
        </TouchableOpacity>
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
        <View style={{ backgroundColor: theme.card }} className="w-full p-4">
          <CategoriesList list={isList} />
        </View>
      </View>
      <CreateCategoryModal
        title="Новая категория"
        visible={isVisibleCreateCategoryModal}
        onClose={() => setIsVisibleCreateCategoryModal(false)}
      />
    </View>
  );
}
