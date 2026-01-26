import { View, ViewStyle } from "react-native";
import { CategoriesScreen } from "../screens/CategoriesScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { ScreenKey } from "../utils/types";
import { IncomeScreen } from "../screens/IncomeScreen";
import { ExpensesScreen } from "../screens/ExpensesScreen";

type LayoutProps = {
  screen: ScreenKey;
  style?: ViewStyle;
  onNavigate: (screen: ScreenKey) => void;
};

export const Layout = ({ screen, style, onNavigate }: LayoutProps) => {
  switch (screen) {
    case 'income':
      return (
        <View style={style}>
          <IncomeScreen onNavigate={onNavigate} />
        </View>
      );

    case 'expenses':
      return (
        <View style={style}>
          <ExpensesScreen onNavigate={onNavigate} />
        </View>
      );

    case 'profile':
      return <View style={style}><ProfileScreen /></View>;

    case 'settings':
      return <View style={style}><SettingsScreen /></View>;

    case 'categories':
    default:
      return <View style={style}><CategoriesScreen /></View>;
  }
};
