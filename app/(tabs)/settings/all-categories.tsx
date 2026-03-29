import CategoriesList from "@/components/Categories/CategoriesList";
import SettingsHeader from "@/components/UI/headers/SettingsHeader";
import NotificationModal from "@/components/UI/modals/NotificationModal";
import Plug from "@/components/UI/Plug";
import { getCategoriesByTypeAll } from "@/database";
import { useTheme } from "@/hooks/useTheme";
import { Category } from "@/utils/types/categories";
import {
  NotificationKey,
  SetNotificationModal,
} from "@/utils/types/notifications";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";

export default function AllCategoriesScreen() {
  const theme = useTheme();

  const [incomeCategories, setIncomeCategories] = useState<Category[]>([]);
  const [expensiveCategories, setExpensiveCategories] = useState<Category[]>(
    [],
  );
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [refreshFlag, setRefreshFlag] = useState(0);

  const requestIdRef = useRef(0);

  const [isVisibleNotificationModal, setIsVisibleNotificationModal] =
    useState(false);
  const [notificationModalTitle, setNotificationModalTitle] = useState("");
  const [notificationModalKey, setNotificationModalKey] =
    useState<NotificationKey>("info");

  const setModal: SetNotificationModal = (isVisible, title, key) => {
    setNotificationModalTitle(title);
    setNotificationModalKey(key);
    setIsVisibleNotificationModal(isVisible);
  };

  const fetchCategories = useCallback(async () => {
    const requestId = ++requestIdRef.current;

    try {
      setLoadingCategories(true);

      const [incomeData, expensiveData] = await Promise.all([
        getCategoriesByTypeAll(2),
        getCategoriesByTypeAll(1),
      ]);

      if (requestId !== requestIdRef.current) return;

      setIncomeCategories(incomeData);
      setExpensiveCategories(expensiveData);
    } catch (error) {
      if (requestId !== requestIdRef.current) return;

      console.error("[Categories] fetch error", error);
      setModal(true, "Не удалось загрузить категории", "error");
    } finally {
      if (requestId !== requestIdRef.current) return;
      setLoadingCategories(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchCategories();
    }, [fetchCategories]),
  );

  const isFirstRefreshEffect = useRef(true);

  useEffect(() => {
    if (isFirstRefreshEffect.current) {
      isFirstRefreshEffect.current = false;
      return;
    }

    fetchCategories();
  }, [refreshFlag, fetchCategories]);

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
            {loadingCategories ? (
              <Text
                style={{ color: theme.secondary }}
                className="text-sm font-medium"
              >
                Загрузка категорий...
              </Text>
            ) : (
              <CategoriesList
                categories={incomeCategories}
                onSubmit={setModal}
                list={false}
                onRefresh={() => setRefreshFlag((prev) => prev + 1)}
              />
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
            {loadingCategories ? (
              <Text
                style={{ color: theme.secondary }}
                className="text-sm font-medium"
              >
                Загрузка категорий...
              </Text>
            ) : (
              <CategoriesList
                categories={expensiveCategories}
                list={false}
                onSubmit={setModal}
                onRefresh={() => setRefreshFlag((prev) => prev + 1)}
              />
            )}
          </View>
        </View>
      </View>

      <NotificationModal
        visible={isVisibleNotificationModal}
        title={notificationModalTitle}
        notificationKey={notificationModalKey}
        onClose={() => setIsVisibleNotificationModal(false)}
      />
    </View>
  );
}
