import { StyleSheet, Button, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ChartIcon from '../assets/chart-pie-svgrepo-com.svg';
import UserIcon from '../assets/user-rounded-svgrepo-com.svg';
import CategoryIcon from '../assets/category-1-svgrepo-com.svg';
import ListIcon from '../assets/list-clipboard-svgrepo-com.svg';
import { useTheme } from "../hooks/useTheme";
import { ScreenKey } from "../utils/types";

type NavMenuProps = {
    active: ScreenKey;
    onNavigate: (screen: ScreenKey) => void;
};

export const NavMenu = ({active, onNavigate}: NavMenuProps) => {
    const theme = useTheme();

    return (
        <View 
            style={[
                styles.container,
                {backgroundColor: theme.card}
            ]}
        >
            <TouchableOpacity
                onPress={() => onNavigate('income')}
                style={[
                    styles.button,
                ]}
            >
                <CategoryIcon width={44} height={44} color={theme.text} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onNavigate('categories')}
                style={[
                    styles.button,
                ]}
            >
                <ChartIcon width={44} height={44} color={theme.text} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onNavigate('categories')}
                style={[
                    styles.button,
                ]}
            >
                <ListIcon width={44} height={44} color={theme.text} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onNavigate('profile')}
                style={[
                    styles.button,
                ]}
            >
                <UserIcon width={44} height={44} color={theme.text} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {   
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 12,
        alignSelf: 'center',
        padding: 16,
    },
    button: {
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: '#000',
    },
});