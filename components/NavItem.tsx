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
        className={`w-full items-center justify-center rounded-xl py-1 ${isActive ? "bg-blue-400" : "bg-transparent"}`}
      >
        {icon}
      </View>
      <Text className={`text-xs ${isActive ? "font-medium" : "font-regular"}`}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}
