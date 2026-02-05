import BasicHeader from "@/components/Headers/BasicHeader";
import Nav from "@/components/Nav";
import "@/global.css";
import React from "react";
import { View } from "react-native";

export default function ChartScreen() {
  return (
    <View className="w-full h-full items-center justify-between">
      <BasicHeader title="Обзор"/>
      <View className="flex-1 w-full bg-yellow-700"></View>
      <Nav />
    </View>
  );
}
