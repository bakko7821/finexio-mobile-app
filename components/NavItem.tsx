import { usePathname, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface NavItemProps {
  icon: React.ReactNode;
  name: string;
  path: string;
}

export default function NavItem({ icon, name, path }: NavItemProps) {
  const router = useRouter();
  const pathname = usePathname();

  const normalizedPathname = pathname?.replace(/\/$/, "");
  const isActive = normalizedPathname?.endsWith(path) || false;

  return (
    <TouchableOpacity
      onPress={() => router.push(path as any)}
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
