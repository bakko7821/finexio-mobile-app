import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import ArrowIcon from '../assets/arrow-sm-up-svgrepo-com.svg'

export const IncomeBox = () => {
    const theme = useTheme()
    return (
        <View style={styles.incomeBox}>
            <TouchableOpacity
                style={[
                    styles.incomeButton,
                    {backgroundColor: theme.card}
                ]}
            >
                <ArrowIcon width={24} height={24} color="#0A8A00" />
                <Text 
                    style={[
                        styles.incomeText,
                        {color: '#0A8A00'}
                    ]}
                >
                    Доходы
                </Text>
                <ArrowIcon width={24} height={24} color="#0A8A00" />
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.incomeButton,
                    {backgroundColor: theme.card}
                ]}
            >
                <ArrowIcon width={24} height={24} color="#8a0000" style={{ transform: [{ scaleY: -1 }] }}/>
                <Text 
                    style={[
                        styles.incomeText,
                        {color: '#8a0000'}
                    ]}
                >
                    Расходы 
                </Text>
                <ArrowIcon width={24} height={24} color="#8a0000" style={{ transform: [{ scaleY: -1 }] }}/>

            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    incomeBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        gap: 4,
    },
    incomeButton: {
        flexDirection: 'row',
        gap: 4,
        flex: 1,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    incomeText: {
        color: 'white',
        fontWeight: 'bold',
    },
});