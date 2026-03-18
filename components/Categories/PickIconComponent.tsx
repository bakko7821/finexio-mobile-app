import { useTheme } from "@/hooks/useTheme";
import { iconsArray } from "@/utils/icons";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  InteractionManager,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const FIRST_BATCH_SIZE = 100;

function sliceIcons(array: typeof iconsArray, count: number) {
  return array.map((section) => ({
    ...section,
    items: section.items.slice(0, count),
  }));
}

function mergeIcons(base: typeof iconsArray, full: typeof iconsArray) {
  return base.map((section, i) => ({
    ...section,
    items: full[i].items,
  }));
}

const MemoIcon = React.memo(function MemoIcon({
  Icon,
  color,
}: {
  Icon: any;
  color: string;
}) {
  return <Icon width={32} height={32} color={color} />;
});

interface PickIconComponentProps {
  selectedIcon: string;
  onSelect: (icon: string) => void;
}

export default function PickIconComponent({
  selectedIcon,
  onSelect,
}: PickIconComponentProps) {
  const theme = useTheme();

  const initialData = useMemo(
    () => sliceIcons(iconsArray, FIRST_BATCH_SIZE),
    [],
  );

  const [data, setData] = useState(initialData);

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      setData((prev) => mergeIcons(prev, iconsArray));
    });

    return () => task.cancel();
  }, []);

  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [anim]);

  const animatedStyle = {
    opacity: anim,
    transform: [
      {
        scale: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.96, 1],
        }),
      },
    ],
  };

  return (
    <Animated.View style={[animatedStyle, { flex: 1 }]}>
      <FlatList
        data={data}
        scrollEnabled
        contentContainerStyle={{
          paddingRight: 8,
          alignItems: "flex-start",
        }}
        style={{ flex: 1 }}
        keyExtractor={(item) => item.id.toString()}
        removeClippedSubviews
        windowSize={3}
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        updateCellsBatchingPeriod={16}
        renderItem={({ item: iconList }) => (
          <View className="w-full flex-col gap-2 pb-[16px]">
            {/* header */}
            <View className="flex flex-row items-center gap-2">
              <Text
                style={{ color: theme.secondary }}
                className="text-xl font-medium"
              >
                {iconList.title}
              </Text>
              <View
                style={{ backgroundColor: theme.secondary }}
                className="flex-1 h-[2px]"
              />
            </View>

            {/* icons grid */}
            <View
              key={`${iconList.id}-${iconList.items.length}`}
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignContent: "flex-start",
              }}
              className="gap-2"
            >
              {iconList.items.map((item) => {
                const isSelected = selectedIcon === item.name;

                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => onSelect(item.name)}
                    className="w-13 h-13 p-2 rounded-xl items-center justify-center"
                    style={{ backgroundColor: theme.card }}
                  >
                    {isSelected && (
                      <View
                        style={{ borderColor: theme.primary }}
                        className="absolute inset-0 rounded-xl border-[2px]"
                      />
                    )}

                    <MemoIcon Icon={item.Icon} color={theme.text} />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      />
    </Animated.View>
  );
}
