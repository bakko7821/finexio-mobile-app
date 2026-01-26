import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useTheme } from "../hooks/useTheme"
import PlusIcon from '../assets/plus-svgrepo-com.svg'
import { IncomeNavigate } from "../components/IncomeNavigate"
import React, { useState } from "react"
import { IncomeExpensesProps } from "./IncomeScreen"
import CrossIcon from '../assets/cross-svgrepo-com.svg'

export const ExpensesScreen = ({onNavigate}: IncomeExpensesProps) => {
    const theme = useTheme()
    const [isOpenCreateCategoryModal, setIsOpenCreateCategoryModal] = useState(false)

    function createNewCategory() {
        setIsOpenCreateCategoryModal(true)
    }

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
                        onPress={createNewCategory}
                    >
                        <PlusIcon width={32} height={32} color={theme.second}/>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                visible={isOpenCreateCategoryModal}
                transparent
                animationType="fade"
                onRequestClose={() => setIsOpenCreateCategoryModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <TouchableOpacity style={styles.modalClose} onPress={() => setIsOpenCreateCategoryModal(false)}/>
                    <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
                        <View style={styles.modalHeader}>
                            <Text style={[styles.modalHeaderTitle, { color: theme.text }]}>Создать категорию</Text>
                            <TouchableOpacity
                                onPress={() => setIsOpenCreateCategoryModal(false)}
                            >
                                <CrossIcon width={32} height={32} color={theme.second} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <View>
                                <Text>Название категории</Text>
                                <TextInput style={styles.modalInput}/>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    modalClose: {
        backgroundColor: 'transparent',
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    modalContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        minHeight: '40%',
        gap: 8,
        borderRadius: 0,
        padding: 16,
        backgroundColor: 'white',
        zIndex: 2,
    },
    modalHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    modalHeaderTitle: {
        fontSize: 16,
        fontWeight: '500'
    },
    modalInput: {
        borderWidth: 2,
        borderColor: 'green'
    },

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
        backgroundColor: 'green',
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