import BasicHeader from "@/components/Headers/BasicHeader";
import Nav from "@/components/Nav";
import "@/global.css";
import React from "react";
import { View } from "react-native";

export default function WalletScreen() {
  return (
    <View className="w-full h-full items-center justify-between">
      <BasicHeader />
      <View className="flex-1 w-full bg-green-700"></View>
      <Nav />
    </View>
  );
}
