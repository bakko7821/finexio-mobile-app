import CrossIcon from "@/assets/ui/CrossFilled.svg";
import BackArrowIcon from "@/assets/ui/arrow-prev-small-svgrepo-com.svg";
import PickColorComponent from "@/components/Categories/PickColorComponent";
import PickIconComponent from "@/components/Categories/PickIconComponent";
import { useTheme } from "@/hooks/useTheme";
import { getContrastColor } from "@/utils/colors";
import { Wallet } from "@/utils/types/wallet";
import { useEffect, useState } from "react";
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { RenderIcon } from "../../RenderIcon";

interface EditWalletModalProps {
  visible: boolean;
  wallet: Wallet | null;
  onRefresh?: () => void;
  onClose: () => void;
}

export default function EditWalletModal({
  visible,
  onClose,
  wallet,
  onRefresh,
}: EditWalletModalProps) {
  const theme = useTheme();
  const [walletNameValue, setWalletNameValue] = useState("");
  const [walletValue, setWalletValue] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const [isVisiblePickColor, setIsVisiblePickColor] = useState(false);
  const [isVisiblePickIcon, setIsVisiblePickIcon] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("");

  useEffect(() => {
    if (!wallet) return;

    setHeaderTitle(`Изменение счёта: ${wallet.name}`);
    setWalletNameValue(wallet.name);
    setSelectedIcon(wallet.icon);
    setSelectedColor(wallet.color);
    setWalletValue(`${wallet.value}`);
  }, [wallet]);

  const getBackHandle = () => {
    if (!wallet) return;

    setHeaderTitle(`Изменение счёта: ${wallet.name}`);
    setIsEdit(false);
    setIsVisiblePickColor(false);
    setIsVisiblePickIcon(false);
  };

  if (wallet)
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
          className="overflow-hidden rounded-t-3xl flex-col"
        >
          <View className="p-4 w-full items-center justify-between flex-row">
            <View className="flex-row gap-2 items-center justify-center">
              {isEdit && (
                <TouchableOpacity onPress={() => getBackHandle()}>
                  <BackArrowIcon width={24} height={24} color={theme.text} />
                </TouchableOpacity>
              )}
              <Text
                style={{ color: theme.text }}
                className="text-base font-medium"
              >
                {headerTitle}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <CrossIcon width={24} height={24} color={theme.text} />
            </TouchableOpacity>
          </View>
          {!isEdit && (
            <>
              <View className="w-full flex-col gap-2">
                <View className="px-4 w-full flex-row items-center justify-between ">
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
                    placeholder='Например: "Наличные"'
                    placeholderTextColor={theme.secondary}
                    {...Platform.select({
                      android: { includeFontPadding: false },
                    })}
                    value={walletNameValue}
                    className="p-1 px-2 border-b-[2px] border-solid"
                    onChangeText={setWalletNameValue}
                  />
                </View>
                <View className="px-4 w-full flex-row items-center justify-between">
                  <Text
                    style={{ color: theme.secondary }}
                    className="text-base font-medium"
                  >
                    Значение:
                  </Text>
                  <TextInput
                    keyboardType="number-pad"
                    style={{
                      color: theme.text,
                      borderColor: theme.text,
                    }}
                    placeholder='Например: "Наличные"'
                    placeholderTextColor={theme.secondary}
                    {...Platform.select({
                      android: { includeFontPadding: false },
                    })}
                    value={walletValue + " ₽"}
                    onChangeText={(text) => {
                      const cleaned = text.replace(/ ₽/g, "");
                      setWalletValue(cleaned);
                    }}
                    className="p-1 px-2 border-b-[2px] border-solid"
                  />
                </View>
                <View className="px-4 w-full flex-row items-center justify-between">
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
                      setIsEdit(true);
                      setIsVisiblePickIcon(true);
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
                <View className="px-4 w-full flex-row items-center justify-between">
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
                      setIsEdit(true);
                      setIsVisiblePickColor(true);
                    }}
                  >
                    <View className="w-[24px] h-[24px]"></View>
                  </TouchableOpacity>
                </View>
              </View>
              <View className="p-4 w-full items-center justify-center">
                <TouchableOpacity
                  style={{ backgroundColor: theme.primary }}
                  className="p-3 rounded-full w-full items-center justify-center"
                >
                  <Text
                    style={{ color: getContrastColor(theme.primary) }}
                    className="text-base font-medium"
                  >
                    Сохранить
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
        {isVisiblePickIcon && (
          <View
            style={{ backgroundColor: theme.header }}
            className="h-[60%] px-4"
          >
            <PickIconComponent
              selectedIcon={selectedIcon}
              onSelect={setSelectedIcon}
            />
          </View>
        )}
        {isVisiblePickColor && (
          <View
            style={{ backgroundColor: theme.header }}
            className="h-[60%] px-4"
          >
            <PickColorComponent
              selectedColor={selectedColor}
              onSelect={setSelectedColor}
            />
          </View>
        )}
      </Modal>
    );
}
