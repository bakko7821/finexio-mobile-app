import { useTheme } from "@/hooks/useTheme";
import { Platform, Text, TouchableOpacity, View } from "react-native";

// import CategoryComponent from "@/components/Categories/CategoryComponent";
import { getAllWallets } from "@/database";
import { createTransaction } from "@/database/queries/transactions";
import { getContrastColor, withOpacity } from "@/utils/colors";
import { dateToIso, isoToDateSafe, nowDay } from "@/utils/date";
import { Category, SubCategory } from "@/utils/types/categories";
import { Wallet } from "@/utils/types/wallet";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import Modal from "react-native-modal";
import NumberInput from "../../NumberInput";
import { RenderIcon } from "../../RenderIcon";
import SelectWalletModal from "../wallet/SelectWalletModal";

interface CreateTransactionModalProps {
  category: Category | null;
  visible: boolean;
  onClose: () => void;
  onRefresh?: () => void;
}

export default function CreateTransactionsModal({
  category,
  visible,
  onClose,
  onRefresh,
}: CreateTransactionModalProps) {
  const theme = useTheme();

  const [refreshFlag, setRefreshFlag] = useState(0);
  const [countValue, setCoutValue] = useState("0");
  const [noteValue, setNoteValue] = useState("");
  const [gasValue, setGasValue] = useState(0);
  const [isOpenDateModal, setIsOpenDateModal] = useState(false);
  const [date, setDate] = useState(nowDay);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategory | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [wallets, setWallets] = useState<Wallet[] | null>([]);
  const [isVisibleNumberInput, setIsVisibleNumberInput] = useState(true);
  const [isVisibleSelectWalletModal, setIsVisibleSelectWalletModal] =
    useState(false);
  const [loadingWallets, setLoadingWallets] = useState(true);

  useEffect(() => {
    if (!category?.gasPrice) {
      setGasValue(0);
      return;
    }

    const numericCount = Number(countValue);
    if (isNaN(numericCount)) {
      setGasValue(0);
      return;
    }

    setGasValue(Number((numericCount / category.gasPrice).toFixed(2)));
  }, [countValue, category?.gasPrice, refreshFlag]);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const data = await getAllWallets();

        setWallets(data);
        setSelectedWallet(data[0]);
      } catch (error: unknown) {
        console.error(error);
      }
    };

    fetchWallets();

    fetchWallets().finally(() => setLoadingWallets(false));
  }, [refreshFlag]);

  if (category === null) return;

  const handleClose = () => {
    setRefreshFlag((prev) => prev + 1);
    setNoteValue("");
    setSelectedSubCategory(null);
    setSelectedWallet(null);
    setDate(nowDay);
    setCoutValue("0");
    setGasValue(0);
    onClose();
  };

  const handleCreateTransaction = async () => {
    console.log(selectedWallet?.id);

    await createTransaction({
      date: date,
      count: Number(countValue),
      categoryId: category.id,
      note: noteValue || undefined,
      walletId: selectedWallet?.id || 0,

      subCategoryId: selectedSubCategory?.id,
      gasValue: gasValue ? Number(gasValue) : undefined,
    });

    onRefresh?.();
    handleClose();
  };

  if (!loadingWallets)
    return (
      <Modal
        isVisible={visible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={300}
        animationOutTiming={300}
        backdropTransitionOutTiming={300}
        onBackdropPress={handleClose}
        onBackButtonPress={handleClose}
        useNativeDriver
        style={{ margin: 0, justifyContent: "flex-end" }}
      >
        <View
          style={{ backgroundColor: theme.header }}
          className="rounded-t-3xl flex-col overflow-hidden"
        >
          <View className="w-full flex-col">
            {/* СЧЕТА + КАТЕГОРИИ*/}
            <View
              style={{
                flexDirection: category.type === 1 ? "row" : "row-reverse",
              }}
              className="w-full"
            >
              {selectedWallet && (
                <TouchableOpacity
                  onPress={() => setIsVisibleSelectWalletModal(true)}
                  style={{ backgroundColor: selectedWallet.color }}
                  className="p-3 flex-1 flex-row gap-2"
                >
                  <RenderIcon
                    name={selectedWallet.icon}
                    width={40}
                    height={40}
                    color={getContrastColor(selectedWallet.color)}
                  />
                  <View className="flex-col">
                    <Text
                      style={{
                        color: withOpacity(
                          getContrastColor(selectedWallet.color),
                          0.6,
                        ),
                      }}
                      className="text-sm font-medium"
                    >
                      {category.type === 1 ? "Со счёта:" : "На счёт:"}
                    </Text>
                    <Text
                      style={{ color: getContrastColor(selectedWallet.color) }}
                      className="text-base font-medium"
                    >
                      {selectedWallet.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              {category && (
                <TouchableOpacity
                  style={{ backgroundColor: category.color }}
                  className="p-3 flex-1 flex-row gap-2"
                >
                  <RenderIcon
                    name={category.icon}
                    width={40}
                    height={40}
                    color={getContrastColor(category.color)}
                  />
                  <View className="flex-col">
                    <Text
                      style={{
                        color: withOpacity(
                          getContrastColor(category.color),
                          0.6,
                        ),
                      }}
                      className="text-sm font-medium"
                    >
                      {category.type === 1 ? "Расход на:" : "Доход с:"}
                    </Text>
                    <Text
                      style={{ color: getContrastColor(category.color) }}
                      className="text-base font-medium"
                    >
                      {category.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
            {/* ПОДКАТЕГОРИИ */}
            {category.subcategories && category.subcategories.length > 0 && (
              <View className="flex-col p-2 py-3 gap-1">
                <Text
                  style={{ color: theme.secondary }}
                  className="text-sm font-medium"
                >
                  Подкатегории:
                </Text>
                <View className="w-full flex-row flex-wrap gap-2 items-center justify-start">
                  {category.subcategories.map((subcategory) => {
                    const isSelected =
                      selectedSubCategory?.id === subcategory.id;

                    return (
                      <TouchableOpacity
                        key={subcategory.id}
                        onPress={() => setSelectedSubCategory(subcategory)}
                        style={{
                          borderColor: category.color,
                          backgroundColor: isSelected
                            ? category.color
                            : "transparent",
                        }}
                        className="px-3 py-1 items-center justify-center rounded-lg border-[2px] border-solid"
                      >
                        <Text
                          className="text-sm font-medium"
                          style={{ color: isSelected ? "#fff" : theme.text }}
                        >
                          {subcategory.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}
            {/* <View className="flex-col gap-1 px-2 items-start justify-start">
              <TextInput
                value={noteValue}
                onChangeText={(text: string) => setNoteValue(text)}
                onPress={() => setIsVisibleNumberInput(false)}
                onFocus={() => setIsVisibleNumberInput(false)}
                onSubmitEditing={() => setIsVisibleNumberInput(true)}
                placeholderTextColor={theme.secondary}
                style={{
                  color: theme.text,
                  backgroundColor: theme.card,
                  padding: 12,
                }}
                className="text-base font-regular rounded-xl w-full items-center justify-center text-center"
                placeholder="Заметка..."
              />
              <Text
                style={{ color: theme.secondary }}
                className="text-sm font-medium"
              >
                Значение:
              </Text>
            </View> */}
            <View
              style={{ backgroundColor: theme.card }}
              className="items-center justify-center w-full p-3"
            >
              <Text
                style={{ color: theme.text }}
                className="text-3xl font-bold"
              >
                {countValue} <Text className="text-base font-medium">₽</Text>
              </Text>
            </View>
            {isVisibleNumberInput && (
              <View className="flex-col p-2 items-start justify-start">
                <NumberInput
                  openCalendar={() => setIsOpenDateModal(true)}
                  value={countValue}
                  setValue={setCoutValue}
                />
              </View>
            )}

            {category?.isGas ? (
              <View className="flex-col gap-1 px-2 items-start justify-start">
                <View className="w-full flex-row items-center justify-between">
                  <Text
                    style={{ color: theme.secondary }}
                    className="text-sm font-medium"
                  >
                    Топливо:
                  </Text>
                  <Text
                    style={{ color: theme.secondary }}
                    className="text-xs font-medium"
                  >
                    Вы можете изменить значение.
                  </Text>
                </View>
                <View className="w-full flex-row items-center justify-between">
                  <Text
                    style={{ color: category.color }}
                    className="text-xl font-medium"
                  >
                    {category.gasType} (
                    <Text
                      style={{ color: theme.secondary }}
                      className="text-base"
                    >
                      {category.gasPrice} ₽ / литр
                    </Text>
                    )
                  </Text>
                  <TouchableOpacity>
                    <Text
                      style={{ color: theme.text }}
                      className="text-base font-medium"
                    >
                      {gasValue} лит.
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </View>
          <View className="p-4">
            <TouchableOpacity
              style={{ backgroundColor: theme.primary }}
              className="flex-row w-full item-center justify-center p-3 rounded-full"
              onPress={handleCreateTransaction}
            >
              <Text
                style={{ color: getContrastColor(theme.primary) }}
                className="text-base font-medium"
              >
                Создать
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <SelectWalletModal
          title={"Выберите счёт"}
          visible={isVisibleSelectWalletModal}
          wallets={wallets}
          onClose={() => setIsVisibleSelectWalletModal(false)}
          selectedWallet={selectedWallet}
          onSelect={setSelectedWallet}
        />
        {Platform.OS === "android" && isOpenDateModal && (
          <DateTimePicker
            value={isoToDateSafe(date)}
            mode="date"
            display="default"
            themeVariant={theme.isDark ? "dark" : "light"}
            onChange={(event, selectedDate) => {
              setIsOpenDateModal(false);
              if (!selectedDate) return;
              setDate(dateToIso(selectedDate));
            }}
          />
        )}
      </Modal>
    );
}
