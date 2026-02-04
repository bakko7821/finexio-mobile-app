import BackIcon from "@/assets/ui/arrow-prev-small-svgrepo-com.svg";
import { createCategory } from "@/db/categories";
import { useTheme } from "@/hooks/useTheme";
import { getContrastColor } from "@/utils/color";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { RenderIcon } from "../UI/RenderIcon";
import TextInputComponent from "../UI/TextInput";

interface CreateCategoryHeaderProps {
  selectedColor: string;
  selectedIcon: string;
}

export default function CreateCategoryHeader({
  selectedColor,
  selectedIcon,
}: CreateCategoryHeaderProps) {
  const theme = useTheme();
  const router = useRouter();

  const [name, setName] = useState("");
  const [type, setType] = useState(1);

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!name.trim()) return;

    try {
      setLoading(true);

      await createCategory({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        icon: selectedIcon ?? null,
        color: selectedColor,
        type,
      });

      router.push("/category");
    } catch (e) {
      console.error("Ошибка создания категории", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        backgroundColor: theme.header,
        // iOS
        shadowColor: theme.text,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,

        // Android
        elevation: 4,
      }}
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
          style={{ backgroundColor: theme.primary }}
          className="px-2 py-1 rounded-xl bg-blue-500"
          onPress={onSubmit}
        >
          <Text
            style={{ color: "#fff" }}
            className="px-2 py-1 rounded-xl text-sm font-medium"
          >
            {loading ? "Создаем..." : "Сохранить"}
          </Text>
        </TouchableOpacity>
      </View>
      <View className="relative pl-[36px] pr-[64px] py-3">
        <View className="flex-col gap-1 items-start w-full">
          <View className="flex-row items-center justify-between px-1 w-full">
            <Text
              style={{ color: theme.secondary }}
              className="text-sm font-medium"
            >
              Название
            </Text>
            <TouchableOpacity
              className="flex-row items-center justify-center gap-1"
              onPress={() => setType((prev) => (prev === 1 ? 2 : 1))}
            >
              <Text style={{ color: theme.secondary }}>Тип:</Text>
              <Text style={{ color: type === 1 ? "#780000" : "green" }}>
                {type === 1 ? "Расходы" : "Доходы"}
              </Text>
            </TouchableOpacity>
          </View>
          <TextInputComponent
            value={name}
            onChange={setName}
            placeholder={"Еда"}
          />
        </View>
        <TouchableOpacity
          onPress={() => router.push("/category-icon")}
          style={{ backgroundColor: selectedColor, zIndex: 999 }}
          className="flex items-center justify-center p-2 rounded-xl absolute bottom-[-24px] right-3"
        >
          <RenderIcon
            name={selectedIcon}
            width={32}
            height={32}
            color={getContrastColor(selectedColor)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
