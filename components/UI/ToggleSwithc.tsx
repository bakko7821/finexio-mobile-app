import { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";

interface AnimatedToggleProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
}

export const AnimatedToggle = ({
  value = false,
  onChange,
}: AnimatedToggleProps) => {
  const [isOn, setIsOn] = useState(value);
  const anim = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    Animated.timing(anim, {
      toValue: isOn ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    const newValue = !isOn;
    setIsOn(newValue);
    onChange?.(newValue);
  };

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 22],
  });

  const bgColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ccc", "#4ade80"],
  });

  return (
    <Pressable onPress={toggle}>
      <Animated.View style={[styles.track, { backgroundColor: bgColor }]}>
        <Animated.View
          style={[styles.thumb, { transform: [{ translateX }] }]}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  track: {
    width: 50,
    height: 28,
    borderRadius: 14,
    padding: 3,
  },
  thumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#fff",
  },
});
