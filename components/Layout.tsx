import { View, ViewStyle } from "react-native";
import { CategoriesScreen } from "../screens/CategoriesScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { ScreenKey } from "../utils/types";

type LayoutProps = {
  screen: ScreenKey;
  style?: ViewStyle;
};

export const Layout = ({ screen, style }: LayoutProps) => {
  switch (screen) {
    case 'profile':
      return <View style={style}><ProfileScreen /></View>;
    case 'settings':
      return <View style={style}><SettingsScreen /></View>;
    case 'categories':
    default:
      return <View style={style}><CategoriesScreen /></View>;
  }
};