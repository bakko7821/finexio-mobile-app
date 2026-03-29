import { useTheme } from "@/hooks/useTheme";
import { withOpacity } from "@/utils/colors";
import { Category } from "@/utils/types/categories";
import { usePathname } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import InfoCategoryModal from "../UI/modals/categories/InfoCategoryModal";
import CreateTransactionsModal from "../UI/modals/transactions/CreateTransactions";
import { RenderIcon } from "../UI/RenderIcon";
import { SetNotificationModal } from "@/utils/types/notifications";

interface CategoriesListProps {
  categories: Category[];
  list: boolean;
  onRefresh?: () => void;
  onSubmit?: SetNotificationModal;
}

export default function CategoriesList({
  categories,
  list,
  onRefresh,
  onSubmit,
}: CategoriesListProps) {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [isOpenCreateTransactionModal, setIsOpenCreateTransactionModal] =
    useState(false);
  const [isOpenInfoCategoryModal, setIsOpenInfoCategoryModal] = useState(false);

  const animValues = useRef<Animated.Value[]>([]);

  useEffect(() => {
    animValues.current = categories.map(
      (_, index) => animValues.current[index] ?? new Animated.Value(0),
    );

    Animated.stagger(
      50,
      animValues.current.map((anim) =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ),
    ).start();
  }, [categories]);

  const pathname = usePathname();

  const handlePress = (category: Category) => {
    if (pathname === "/settings/all-categories") {
      setSelectedCategory(category);
      setIsOpenInfoCategoryModal(true);
    } else {
      setSelectedCategory(category);
      setIsOpenCreateTransactionModal(true);
    }
  };

  const handleLongPress = (category: Category) => {
    if (pathname === "/settings/all-categories") return;

    setSelectedCategory(category);
    setIsOpenInfoCategoryModal(true);
  };

  if (categories.length === 0) {
    return (
      <Text style={{ color: theme.secondary }} className="text-sm font-medium">
        У вас отсутствуют категории.
      </Text>
    );
  }

  return (
    <>
      {list ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingVertical: 8, paddingHorizontal: 4 }}
          showsVerticalScrollIndicator={false}
        >
          {categories.map((item, index) => {
            const anim = animValues.current[index];
            if (!anim) return null;

            return (
              <Animated.View
                key={item.name}
                style={{
                  opacity: anim,
                  transform: [
                    {
                      translateY: anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [10, 0],
                      }),
                    },
                    {
                      scale: anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.95, 1],
                      }),
                    },
                  ],
                  marginBottom: 8, // spacing между элементами
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: item.isArchive
                      ? withOpacity(theme.secondary, 0.4)
                      : withOpacity(item.color, 0.4),
                  }}
                  className="p-3 w-full flex-row items-center gap-2 justify-start rounded-full"
                  onPress={() => handlePress(item)}
                  onLongPress={() => handleLongPress(item)}
                >
                  <RenderIcon
                    name={item.icon}
                    width={24}
                    height={24}
                    color={item.isArchive ? theme.secondary : item.color}
                  />
                  <Text
                    style={{
                      color: item.isArchive ? theme.secondary : item.color,
                    }}
                    className="text-base font-medium"
                  >
                    {item.isArchive
                      ? `${item.name} (Архивная)`
                      : `${item.name}`}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </ScrollView>
      ) : (
        <View className="w-full flex-row flex-wrap gap-2">
          {categories.map((category, index) => {
            const anim = animValues.current[index];
            if (!anim) return null;

            return (
              <Animated.View
                key={category.name}
                style={{
                  opacity: anim,
                  transform: [
                    {
                      translateY: anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [10, 0],
                      }),
                    },
                    {
                      scale: anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.95, 1],
                      }),
                    },
                  ],
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: category.isArchive
                      ? withOpacity(theme.secondary, 0.4)
                      : withOpacity(category.color, 0.4),
                  }}
                  className="p-3 rounded-full"
                  onPress={() => handlePress(category)}
                  onLongPress={() => handleLongPress(category)}
                >
                  <RenderIcon
                    name={category.icon}
                    width={28}
                    height={28}
                    color={
                      category.isArchive ? theme.secondary : category.color
                    }
                  />
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      )}

      <CreateTransactionsModal
        onRefresh={onRefresh}
        visible={isOpenCreateTransactionModal}
        onClose={() => setIsOpenCreateTransactionModal(false)}
        category={selectedCategory}
      />
      <InfoCategoryModal
        onRefresh={onRefresh}
        category={selectedCategory}
        visible={isOpenInfoCategoryModal}
        onSubmit={onSubmit}
        onClose={() => setIsOpenInfoCategoryModal(false)}
      />
    </>
  );
}
