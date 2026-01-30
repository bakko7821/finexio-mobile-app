import BackIcon from "@/assets/icons/arrow-prev-small-svgrepo-com.svg";
import { createCategory } from "@/db/repos/categoryRepo";
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import TextInputComponent from "../UI/TextInput";

export default function CreateCategoryHeader() {
  const theme = useTheme();
  const router = useRouter();

  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("#FF9800");
  const [type, setType] = useState(1);

  const onSubmit = async () => {
    await createCategory({
      name,
      icon,
      color,
      type,
    });

    router.back();
  };

  return (
    <View
      style={{ backgroundColor: theme.header }}
      className="flex-col w-full p-3 pt-[52px]"
    >
      <View className="flex-row items-center justify-between w-full">
        <View className="flex-row gap-3 items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <BackIcon width={24} height={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={{ color: theme.text }} className="text-base font-medium">
            Новая категория
          </Text>
        </View>
        <TouchableOpacity
          className="px-2 py-1 rounded-xl bg-blue-500"
          onPress={onSubmit}
        >
          <Text style={{ color: "#fff" }} className="text-sm font-medium">
            Сохранить
          </Text>
        </TouchableOpacity>
      </View>
      <View className="relative pl-[48px] pr-[64px] py-3">
        <View className="flex-col gap-1 items-start w-full">
          <Text className="px-1" style={{ color: theme.secondary }}>
            Название
          </Text>
          <TextInputComponent
            value={name}
            onChange={setName}
            placeholder={"Еда"}
          />
        </View>
        <TouchableOpacity
          onPress={() => router.push("/category-icon")}
          style={{ backgroundColor: "#EE741D", zIndex: 999 }}
          className="w-10 h-10 rounded-xl absolute bottom-[-24px] right-3"
        ></TouchableOpacity>
      </View>
    </View>
  );
}
