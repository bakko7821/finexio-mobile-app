import ArrowIcon from "@/assets/ui/arrow-prev-small-svgrepo-com.svg";
import React, { useRef } from "react";
import { Animated, TouchableOpacity, View } from "react-native";

type MonthHeaderProps = {
  monthTitle: string;
  setMonthOffset: (updater: (prev: number) => number) => void;
  theme: {
    card: string;
    text: string;
  };
};

const MonthHeader: React.FC<MonthHeaderProps> = ({
  monthTitle,
  setMonthOffset,
  theme,
}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleChangeMonth = (offset: number) => {
    // явно типизировано
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: offset > 0 ? 20 : -20,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setMonthOffset((o) => o + offset);
      slideAnim.setValue(offset > 0 ? -20 : 20);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  return (
    <View
      style={{ backgroundColor: theme.card }}
      className="pt-[50px] p-4 w-full flex-row items-center justify-between"
    >
      <TouchableOpacity onPress={() => handleChangeMonth(-1)} hitSlop={10}>
        <ArrowIcon width={24} height={24} color={theme.text} />
      </TouchableOpacity>

      <Animated.Text
        style={{
          color: theme.text,
          transform: [{ translateX: slideAnim }],
          opacity: fadeAnim,
        }}
        className="text-lg font-semibold"
      >
        {monthTitle}
      </Animated.Text>

      <TouchableOpacity
        onPress={() => handleChangeMonth(1)}
        hitSlop={10}
        style={{ transform: [{ scaleX: -1 }] }}
        className="transform"
      >
        <ArrowIcon width={24} height={24} color={theme.text} />
      </TouchableOpacity>
    </View>
  );
};

export default MonthHeader;
