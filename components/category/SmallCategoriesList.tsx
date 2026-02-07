import React, { useRef } from "react";
import {
    Animated,
    PanResponder,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export interface SmallCategory {
  name: string;
  color: string;
}

interface SwipeableSmallCategoryProps {
  item: SmallCategory;
  onDelete: (name: string) => void;
}

export const SwipeableSmallCategory: React.FC<SwipeableSmallCategoryProps> = ({
  item,
  onDelete,
}) => {
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: (_, gesture) =>
        Math.abs(gesture.dx) > 5,

      onPanResponderMove: (_, gesture) => {
        if (gesture.dx < 0) {
          translateX.setValue(gesture.dx); // ❗ только влево
        }
      },

      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx < -80) {
          Animated.timing(translateX, {
            toValue: -120,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            onDelete(item.name);
          });
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <View>
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          transform: [{ translateX }],
          backgroundColor: item.color,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => console.log("Нажали:", item.name)}
          className="p-3"
        >
          <Text style={{ color: "white" }} className="text-sm font-medium">
            {item.name}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

interface SmallCategoriesListProps {
  smallCategories: SmallCategory[];

  onDelete: (name: string) => void;
}

export const SmallCategoriesList: React.FC<SmallCategoriesListProps> = ({
  smallCategories,
  onDelete,
}) => {
  return (
    <View className="flex-col gap-2 w-full">
      {smallCategories.map((item) => (
        <SwipeableSmallCategory
          key={item.name}
          item={item}
          onDelete={onDelete}
        />
      ))}
    </View>
  );
};
