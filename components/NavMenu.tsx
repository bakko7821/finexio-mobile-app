import { StyleSheet, Button, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ChartIcon from '../assets/chart-pie-svgrepo-com.svg';

export const NavMenu = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
            >
                <ChartIcon width={36} height={36} fill="#000" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {    
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
    },
    button: {
        alignItems: 'center',
        marginHorizontal: 10,
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 10,
    },
    buttonText: {
        marginTop: 5,
        fontSize: 16,
        color: '#000',
    },
});