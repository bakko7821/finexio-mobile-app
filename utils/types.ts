import { Dimensions } from "react-native";

export type ScreenKey = 
    'categories' | 
    'profile' | 
    'settings' | 
    'income' |
    'expenses'; 

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');