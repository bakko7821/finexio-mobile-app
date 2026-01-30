import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { View } from "react-native";

export default function Plug () {
    const theme = useTheme()
    return <View style={{backgroundColor: theme.secondary}} className="w-full h-[2px] rounded-xl"></View>
}