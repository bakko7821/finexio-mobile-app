import { useTheme } from "@/hooks/useTheme";
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import BackIcon from "@/assets/ui/arrow-prev-small-svgrepo-com.svg";
import TypeArrowDownIcon from "@/assets/ui/ArrowDown.svg";
import TypeArrowUpIcon from "@/assets/ui/ArrowUp.svg";
import CrossIcon from "@/assets/ui/CrossFilled.svg";
import PlusIcon from "@/assets/ui/Plus.svg";
import PickColorComponent from "@/components/Categories/PickColorComponent";
import PickIconComponent from "@/components/Categories/PickIconComponent";
import { createCategory } from "@/database/queries/categories";
import { getContrastColor } from "@/utils/colors";
import { useState } from "react";
import Modal from "react-native-modal";
import Plug from "../Plug";
import { RenderIcon } from "../RenderIcon";
import InputModal from "./InputModal";

interface CreateCategoryModalProps {
  title: string;
  visible: boolean;
  onClose: () => void;
  onRefresh?: () => void;
}

export default function CreateCategoryModal({
  title = "Новая категория",
  visible,
  onClose,
  onRefresh,
}: CreateCategoryModalProps) {
  const theme = useTheme();

  const [categoryType, setCategoryType] = useState(1);
  const [headerTitle, setHeaderTitle] = useState(title);
  const [isBack, setIsBack] = useState(false);

  const [isCreateComponent, setIsCreateComponent] = useState(true);
  const [isIconComponent, setIsIconComponent] = useState(false);
  const [isColorComponent, setIsColorComponent] = useState(false);

  const [isOpenInputGasTypeModal, setIsInputGasTypeModal] = useState(false);
  const [isOpenInputGasValuePerLitreModal, setIsInputGasValuePerLitreModal] =
    useState(false);

  const [gasTypeValue, setGasTypeValue] = useState("");
  const [gasValuePerLitre, setGasValuePerLitre] = useState(0);

  const [categoryNameValue, setCategoryNameValue] = useState("");

  const [selectedIcon, setSelectedIcon] = useState("burger");
  const [selectedColor, setSelectedColor] = useState("#ff0000");

  const createCategoryHandle = async () => {
    if (!categoryNameValue.trim()) {
      return;
    }

    const isGasCategory =
      selectedIcon === "gas" ||
      ["топливо", "бензин", "заправка"].includes(
        categoryNameValue.trim().toLowerCase(),
      );

    try {
      await createCategory({
        name: categoryNameValue.trim(),
        color: selectedColor,
        icon: selectedIcon,
        type: categoryType,

        isArchive: false,
        isGas: isGasCategory,

        gasType:
          isGasCategory && gasTypeValue.trim()
            ? gasTypeValue.trim()
            : undefined,

        gasPrice:
          isGasCategory && gasValuePerLitre > 0 ? gasValuePerLitre : undefined,
      });

      onRefresh?.();
      onClose();
    } catch (error) {
      console.error("Ошибка создания категории:", error);
    }
  };

  return (
    <Modal
      isVisible={visible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionOutTiming={300}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      useNativeDriver
      style={{ margin: 0, justifyContent: "flex-end" }}
    >
      <View
        style={{ backgroundColor: theme.header }}
        className="rounded-t-3xl p-4 gap-3 flex-col min-h-[80%]"
      >
        <View className="flex-row items-center justify-between">
          {isBack && (
            <TouchableOpacity
              onPress={() => {
                setIsColorComponent(false);
                setIsIconComponent(false);
                setIsBack(false);
                setIsCreateComponent(true);
                setHeaderTitle("Новая категория");
              }}
            >
              <BackIcon width={24} height={24} color={theme.text} />
            </TouchableOpacity>
          )}
          <Text style={{ color: theme.text }} className="text-base font-medium">
            {headerTitle}
          </Text>
          <TouchableOpacity onPress={onClose}>
            <CrossIcon width={24} height={24} color={theme.text} />
          </TouchableOpacity>
        </View>
        {isCreateComponent && (
          <View className="flex-col gap-3 w-full flex-1">
            <View className="flex-col gap-2">
              <Text
                style={{ color: theme.primary }}
                className="text-xl font-semibold"
              >
                Настройки
              </Text>
              <Plug />
              <View className="flex-col gap-2">
                <View className="w-full flex-row items-center justify-between">
                  <Text
                    style={{ color: theme.secondary }}
                    className="text-base font-medium"
                  >
                    Тип транзакции:
                  </Text>
                  <TouchableOpacity
                    className="flex-row items-center gap-1"
                    onPress={() =>
                      setCategoryType((prev) => (prev === 1 ? 2 : 1))
                    }
                  >
                    {categoryType === 1 ? (
                      <TypeArrowDownIcon
                        width={20}
                        height={20}
                        color={theme.red}
                      />
                    ) : (
                      <TypeArrowUpIcon
                        width={20}
                        height={20}
                        color={theme.green}
                      />
                    )}
                    <Text
                      style={{
                        color: categoryType === 1 ? theme.red : theme.green,
                      }}
                      className="text-base font-medium"
                    >
                      {categoryType === 1 ? "Расходы" : "Доходы"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="w-full flex-row items-center justify-between">
                  <Text
                    style={{ color: theme.secondary }}
                    className="text-base font-medium"
                  >
                    Название:
                  </Text>
                  <TextInput
                    style={{
                      color: theme.text,
                      borderColor: theme.text,
                    }}
                    placeholder='Например: "Еда"'
                    placeholderTextColor={theme.secondary}
                    {...Platform.select({
                      android: { includeFontPadding: false },
                    })}
                    value={categoryNameValue}
                    className="p-2 border-b-[2px] border-solid"
                    onChangeText={setCategoryNameValue}
                  />
                </View>
                <View className="w-full flex-row items-center justify-between">
                  <Text
                    style={{ color: theme.secondary }}
                    className="text-base font-medium"
                  >
                    Иконка:
                  </Text>
                  <TouchableOpacity
                    style={{ backgroundColor: theme.card }}
                    className="p-2 rounded-xl"
                    onPress={() => {
                      setIsIconComponent(true);
                      setIsCreateComponent(false);
                      setIsBack(true);
                      setHeaderTitle("Выбор иконки");
                    }}
                  >
                    <RenderIcon
                      name={selectedIcon}
                      width={24}
                      height={24}
                      color={theme.text}
                    />
                  </TouchableOpacity>
                </View>
                <View className="w-full flex-row items-center justify-between">
                  <Text
                    style={{ color: theme.secondary }}
                    className="text-base font-medium"
                  >
                    Цвет:
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: selectedColor,
                    }}
                    className="p-2 rounded-xl"
                    onPress={() => {
                      setIsColorComponent(true);
                      setIsCreateComponent(false);
                      setIsBack(true);
                      setHeaderTitle("Выбор цвета");
                    }}
                  >
                    <View className="w-[24px] h-[24px]"></View>
                  </TouchableOpacity>
                </View>
                {(["топливо", "бензин", "заправка"].includes(
                  categoryNameValue.toLowerCase(),
                ) ||
                  selectedIcon === "gas") && (
                  <>
                    <View className="w-full flex-row items-center justify-between">
                      <Text
                        style={{ color: theme.secondary }}
                        className="text-base font-medium"
                      >
                        Тип топлива:
                      </Text>
                      <TouchableOpacity
                        onPress={() => setIsInputGasTypeModal(true)}
                      >
                        <Text
                          style={{
                            color: gasTypeValue
                              ? theme.primary
                              : theme.secondary,
                          }}
                          className="text-base font-medium"
                        >
                          {gasTypeValue ? gasTypeValue : "Указать..."}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View className="w-full flex-row items-center justify-between">
                      <Text
                        style={{ color: theme.secondary }}
                        className="text-base font-medium"
                      >
                        Цена за литр:
                      </Text>
                      <TouchableOpacity
                        onPress={() => setIsInputGasValuePerLitreModal(true)}
                      >
                        <Text
                          style={{
                            color: gasValuePerLitre
                              ? theme.text
                              : theme.secondary,
                          }}
                          className="text-base font-medium"
                        >
                          {gasValuePerLitre ? gasValuePerLitre : "0"} ₽
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            </View>
            <View className="flex-col gap-2">
              <View className="w-full flex-row items-center justify-between">
                <Text
                  style={{ color: theme.primary }}
                  className="text-xl font-semibold"
                >
                  Подкатегории
                </Text>
                <TouchableOpacity>
                  <PlusIcon width={20} height={20} color={theme.primary} />
                </TouchableOpacity>
              </View>
              <Plug />
              <View className="flex-col gap-2"></View>
            </View>
          </View>
        )}
        {isIconComponent && (
          <View className="w-full flex-1">
            <PickIconComponent
              selectedIcon={selectedIcon}
              onSelect={setSelectedIcon}
            />
          </View>
        )}
        {isColorComponent && (
          <View className="w-full flex-1">
            <PickColorComponent
              selectedColor={selectedColor}
              onSelect={setSelectedColor}
            />
          </View>
        )}
        {isCreateComponent && (
          <TouchableOpacity
            onPress={createCategoryHandle}
            style={{ backgroundColor: theme.primary }}
            className="flex-row w-full item-center justify-center p-3 rounded-full"
          >
            <Text
              style={{ color: getContrastColor(theme.primary) }}
              className="text-base font-medium"
            >
              Создать
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <InputModal
        title="Укажите тип топлива."
        visible={isOpenInputGasTypeModal}
        onClose={() => setIsInputGasTypeModal(false)}
        value={gasTypeValue}
        onChange={setGasTypeValue}
      />
      <InputModal
        title="Укажите цену за литр топлива."
        visible={isOpenInputGasValuePerLitreModal}
        onClose={() => setIsInputGasValuePerLitreModal(false)}
        value={gasValuePerLitre.toString()}
        onChange={(text) => {
          const num = parseFloat(text); // string → number
          if (!isNaN(num)) setGasValuePerLitre(num);
          else setGasValuePerLitre(0); // или оставляем прежнее значение
        }}
      />
    </Modal>
  );
}
