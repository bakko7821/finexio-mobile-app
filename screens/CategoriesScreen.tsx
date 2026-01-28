import { Text, View } from "react-native";
import { CategoryHeader } from "../components/Headers/CategoryHeader";
import { ScreenLayout } from "../layouts/ScreenLayout";

export function CategoryScreen() {
  return (
    <ScreenLayout 
        header={<CategoryHeader />}
        showNav
    >
        <View>
            <Text>Категории контент</Text>
        </View>
    </ScreenLayout>
  );
}
