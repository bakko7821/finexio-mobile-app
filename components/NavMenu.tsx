import { StyleSheet, Button, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ChartIcon from '../assets/chart-pie-svgrepo-com.svg';
import UserIcon from '../assets/user-rounded-svgrepo-com.svg';
import CategoryIcon from '../assets/category-1-svgrepo-com.svg';
import ListIcon from '../assets/list-clipboard-svgrepo-com.svg';
import { useTheme } from "../hooks/useTheme";

export const NavMenu = () => {
    const theme = useTheme();

    return (
        <View 
            style={[
                styles.container,
                {backgroundColor: theme.card}
            ]}
        >
            <TouchableOpacity
                style={[
                    styles.button,
                ]}
            >
                <CategoryIcon width={40} height={40} color={theme.text} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.button,
                ]}
            >
                <ChartIcon width={40} height={40} color={theme.text} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.button,
                ]}
            >
                <ListIcon width={40} height={40} color={theme.text} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.button,
                ]}
            >
                <UserIcon width={40} height={40} color={theme.text} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {   
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderRadius: 12,
        alignSelf: 'center',
        padding: 8,
    },
    button: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 16,
        color: '#000',
    },
});