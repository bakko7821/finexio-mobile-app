import BackIcon from "@/assets/ui/arrow-prev-small-svgrepo-com.svg";
import QuestionIcon from "@/assets/ui/question-svgrepo-com.svg";
import { createCategory } from "@/db/categories";
import { useTheme } from "@/hooks/useTheme";
import { getContrastColor } from "@/utils/color";
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

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!name.trim()) return;

    try {
      setLoading(true);

      await createCategory({
        name: name.trim(),
        icon: icon || undefined,
        color,
        type,
      });

      router.back();
    } catch (e) {
      console.error("Ошибка создания категории", e);
    } finally {
      setLoading(false);
    }
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
          <TouchableOpacity
            disabled={loading}
            className={`px-2 py-1 rounded-xl ${
              loading ? "bg-blue-300" : "bg-blue-500"
            }`}
            onPress={onSubmit}
          >
            <Text style={{ color: "#fff" }} className="text-sm font-medium">
              Сохранить
            </Text>
          </TouchableOpacity>
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
          className="flex items-center justify-center p-2 rounded-xl absolute bottom-[-24px] right-3"
        >
          <QuestionIcon
            width={24}
            height={24}
            color={getContrastColor("#EE741D")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
