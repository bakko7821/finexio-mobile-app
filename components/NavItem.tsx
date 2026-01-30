import { useTheme } from "@/hooks/useTheme";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface NavItemProps {
  icon: React.ReactNode;
  name: string;
  path: string;
  isButton?: boolean;
  buttonLogic?: () => void;
}

export default function NavItem({
  icon,
  name,
  path,
  isButton,
  buttonLogic,
}: NavItemProps) {
  const safePath = isButton ? "__button__" : path;

  const router = useRouter();
  const pathname = usePathname();

  const normalizedPathname = pathname?.replace(/\/$/, "");
  const isActive = normalizedPathname?.endsWith(safePath) || false;

  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={() => {
        if (isButton) {
          buttonLogic?.();
        } else {
          router.push(path as any);
        }
      }}
      className="w-16 flex-col items-center justify-center p-0 gap-1"
    >
      <View
        style={{ backgroundColor: isActive ? theme.primary : "bg-transparent" }}
        className={`w-full items-center justify-center rounded-xl py-1`}
      >
        {icon}
      </View>
      <Text
        style={{ color: theme.text }}
        className={`text-xs ${isActive ? "font-medium" : "font-regular"}`}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
}
