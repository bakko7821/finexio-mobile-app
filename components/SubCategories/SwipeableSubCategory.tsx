import { useTheme } from "@/hooks/useTheme";
import { getContrastColor } from "@/utils/colors";
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
}
interface SwipeableSmallCategoryProps {
  item: SmallCategory;
  selectedColor: string;
  onDelete: (name: string) => void;
}

export const SwipeableSmallCategory: React.FC<SwipeableSmallCategoryProps> = ({
  item,
  onDelete,
  selectedColor,
}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const theme = useTheme();

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
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => console.log("Нажали:", item.name)}
          className="gap-2 p-3 flex-row items-center w-full justify-start rounded-xl"
          style={{ backgroundColor: selectedColor }}
        >
          <Text
            style={{ color: getContrastColor(selectedColor ?? theme.primary) }}
            className="text-base font-medium"
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
