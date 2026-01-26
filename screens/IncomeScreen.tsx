import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useTheme } from "../hooks/useTheme"
import PlusIcon from '../assets/plus-svgrepo-com.svg'
import { IncomeNavigate } from "../components/IncomeNavigate"
import { ScreenKey } from "../utils/types"
import React from "react"

export interface IncomeExpensesProps {
    onNavigate: (screen: ScreenKey) => void;
}

export const IncomeScreen = ({onNavigate}: IncomeExpensesProps) => {
    const theme = useTheme()

    return (
        <View style={styles.main}>
            <IncomeNavigate
                onNavigate={onNavigate}
            />
            <View style={styles.chartBox}>

            </View>
            <View style={styles.categoryBox}>
                <Text style={[
                    styles.categoryBoxText,
                    {color: theme.text}
                ]}>Список категорий</Text>
                <View>
                    <TouchableOpacity
                        style={[
                            styles.newCategoryButton,
                            {
                                backgroundColor: theme.card,
                                borderColor: theme.second
                            }
                        ]}
                    >
                        <PlusIcon width={32} height={32} color={theme.second}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingHorizontal: 16,
        flex: 1,
        gap: 8,
        width: '100%',
    },

    chartBox: {
        backgroundColor: 'red',
        width: '100%',
        height: 220,
    },
    
    categoryBox: {
        alignItems: 'flex-start',
        gap: 8,
        width: '100%',
    },
    categoryBoxText: {
        fontSize: 16,
        fontWeight: '500',
    },
    newCategoryButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 999,
        alignSelf: 'center',
        padding: 8,
        borderWidth: 2,
    }
})