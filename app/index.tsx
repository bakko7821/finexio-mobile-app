import "@/global.css";
import { useRouter } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 h-full justify-center items-center bg-red-300 gap-5">
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button
        title="go to category"
        onPress={() => router.push("/category")}
      ></Button>
    </View>
  );
}
