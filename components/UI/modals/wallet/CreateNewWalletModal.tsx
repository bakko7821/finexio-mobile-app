import { useTheme } from "@/hooks/useTheme";
import { View } from "react-native";
import Modal from "react-native-modal";

interface CreateNewWalletModalProps {
    visible: boolean,
    onClose: () => void;
    onRefresh?: () => void;
}

export default function CreateNewWalletModal({ visible, onClose, onRefresh }: CreateNewWalletModalProps) {
    const theme = useTheme()

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
                style={{ backgroundColor: theme.header }}
                className="rounded-t-3xl p-4 gap-3 flex-col min-h-[80%]"
            ></View></Modal>
    )
}