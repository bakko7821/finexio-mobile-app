import ArrowIcon from "@/assets/ui/arrow-prev-small-svgrepo-com.svg";
import CrossIcon from "@/assets/ui/CrossFilled.svg";
import PickColorComponent from "@/components/Categories/PickColorComponent";
import PickIconComponent from "@/components/Categories/PickIconComponent";
import { createWallet } from "@/database/queries/wallets";
import { useTheme } from "@/hooks/useTheme";
import { getContrastColor } from "@/utils/colors";
import { SetNotificationModal } from "@/utils/types/notifications";
import { useEffect, useState } from "react";
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import Plug from "../../Plug";
import { RenderIcon } from "../../RenderIcon";

interface CreateNewWalletModalProps {
  visible: boolean;
  onClose: () => void;
  onRefresh?: () => void;
  onSubmit?: SetNotificationModal;
}

export default function CreateNewWalletModal({
  visible,
  onClose,
  onRefresh,
  onSubmit,
}: CreateNewWalletModalProps) {
  const theme = useTheme();

  const [isIconComponent, setIsIconComponent] = useState(false);
  const [isCreateComponent, setIsCreateComponent] = useState(true);
  const [isColorComponent, setIsColorComponent] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("Новый счёт");

  const [walletNameValue, setWaletNameValue] = useState("");
  const [walletValue, setWaletValue] = useState("0");
  const [selectedIcon, setSelectedIcon] = useState("money");
  const [selectedColor, setSelectedColor] = useState("#00eeff");

  const setDefault = () => {
    setWaletValue("0");
    setWaletNameValue("");
    setIsIconComponent(false);
    setIsColorComponent(false);
    setIsCreateComponent(true);
    setIsBack(false);
    setHeaderTitle("Новый счёт");
    setSelectedColor("money");
    setSelectedColor("#00eeff");
  };

  const backHandle = () => {
    setIsColorComponent(false);
    setIsIconComponent(false);
    setHeaderTitle("Новый счёт");
    setIsBack(false);
    setIsCreateComponent(true);
  };

  useEffect(() => {
    setDefault();
  }, []);

  const handleCreateNewWallet = async () => {
    if (!walletNameValue.trim()) {
      return;
    }

    try {
      const dto = {
        name: walletNameValue.trim(),
        icon: selectedIcon,
        color: selectedColor,
        value: Number(walletValue.replace(",", ".")) || 0,
      };

      await createWallet(dto);

      onSubmit?.(true, "Вы создали новый счёт", "success");

      onRefresh?.();
      onClose();
      setDefault();
    } catch (e) {
      console.error("Failed to create wallet", e);
      onSubmit?.(true, "Не удалось создать новый счёт", "error");
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
      removeClippedSubviews={false}
      style={{ margin: 0, justifyContent: "flex-end" }}
    >
      <View
        style={{
          backgroundColor: theme.header,
          minHeight: isCreateComponent ? "50%" : "80%",
        }}
        className="rounded-t-3xl p-4 gap-3 flex-col"
      >
        <View className="w-10 h-1.5 bg-gray-400/40 rounded-full self-center mb-3" />
        <View className="flex-row w-full justify-between items-center">
          {isBack && (
            <TouchableOpacity onPress={() => backHandle()}>
              <ArrowIcon width={24} height={24} color={theme.text} />
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
          <>
            <View className="flex-col gap-3 w-full flex-1">
              <View className="flex-col gap-2">
                <Text
                  style={{ color: theme.primary }}
                  className="text-xl font-semibold"
                >
                  Настройки
                </Text>
                <Plug />
                <View className="flex-col w-full gap-2">
                  <View className="w-full flex-row items-center justify-between">
                    <Text
                      style={{ color: theme.secondary }}
                      className="text-sm font-medium"
                    >
                      Название:
                    </Text>
                    <TextInput
                      style={{
                        color: theme.text,
                        borderColor: theme.text,
                      }}
                      placeholder='Например: "Наличные"'
                      placeholderTextColor={theme.secondary}
                      {...Platform.select({
                        android: { includeFontPadding: false },
                      })}
                      value={walletNameValue}
                      className="p-2 border-b-[2px] border-solid"
                      onChangeText={setWaletNameValue}
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
                  <View className="w-full flex-row items-center justify-between">
                    <Text
                      style={{ color: theme.secondary }}
                      className="text-sm font-medium"
                    >
                      Начальный баланс:
                    </Text>
                    <TextInput
                      style={{
                        color: theme.text,
                        borderColor: theme.text,
                      }}
                      placeholder='Например: "100 ₽"'
                      placeholderTextColor={theme.secondary}
                      {...Platform.select({
                        android: { includeFontPadding: false },
                      })}
                      value={walletValue}
                      className="p-2 border-b-[2px] border-solid"
                      onChangeText={setWaletValue}
                    />
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={handleCreateNewWallet}
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
          </>
        )}
        {isColorComponent && (
          <PickColorComponent
            selectedColor={selectedColor}
            onSelect={setSelectedColor}
          />
        )}
        {isIconComponent && (
          <PickIconComponent
            selectedIcon={selectedIcon}
            onSelect={setSelectedIcon}
          />
        )}
      </View>
    </Modal>
  );
}
