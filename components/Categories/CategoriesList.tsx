import { useTheme } from "@/hooks/useTheme";
import { Category } from "@/utils/categories";
import { getContrastColor } from "@/utils/colors";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  ListRenderItemInfo,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import InfoCategoryModal from "../UI/modals/categories/InfoCategoryModal";
import CreateTransactionsModal from "../UI/modals/transactions/CreateTransactions";
import { RenderIcon } from "../UI/RenderIcon";

interface CategoriesListProps {
  categories: Category[];
  list: boolean;
  onRefresh?: () => void;
}

export default function CategoriesList({
  categories,
  list,
  onRefresh,
}: CategoriesListProps) {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [isOpenCreateTransactionModal, setIsOpenCreateTransactionModal] =
    useState(false);
  const [isOpenInfoCategoryModal, setIsOpenInfoCategoryModal] = useState(false);

  // анимации для каждой категории
  const animValues = useRef<Animated.Value[]>([]);

  // эффект: при смене categories плавно показываем иконки
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

  const handlePress = (category: Category) => {
    setSelectedCategory(category);
    setIsOpenCreateTransactionModal(true);
  };

  const handleLongPress = (category: Category) => {
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

  const renderItem = ({ item, index }: ListRenderItemInfo<Category>) => {
    const anim = animValues.current[index];
    if (!anim) return null;

    return (
      <Animated.View
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
          style={{ backgroundColor: item.color }}
          className="p-3 w-full flex-row items-center gap-2 justify-start rounded-full"
          onPress={() => handlePress(item)}
          onLongPress={() => handleLongPress(item)}
        >
          <RenderIcon
            name={item.icon}
            width={24}
            height={24}
            color={getContrastColor(item.color)}
          />
          <Text
            style={{ color: getContrastColor(item.color) }}
            className="text-base font-medium"
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

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
                  style={{ backgroundColor: item.color }}
                  className="p-3 w-full flex-row items-center gap-2 justify-start rounded-full"
                  onPress={() => handlePress(item)}
                  onLongPress={() => handleLongPress(item)}
                >
                  <RenderIcon
                    name={item.icon}
                    width={24}
                    height={24}
                    color={getContrastColor(item.color)}
                  />
                  <Text
                    style={{ color: getContrastColor(item.color) }}
                    className="text-base font-medium"
                  >
                    {item.name}
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
                  style={{ backgroundColor: category.color }}
                  className="p-3 rounded-full"
                  onPress={() => handlePress(category)}
                  onLongPress={() => handleLongPress(category)}
                >
                  <RenderIcon
                    name={category.icon}
                    width={28}
                    height={28}
                    color={getContrastColor(category.color)}
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
        onClose={() => setIsOpenInfoCategoryModal(false)}
      />
    </>
  );
}
