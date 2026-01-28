import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CategoryScreen } from "../screens/CategoriesScreen";
import { CreateNewCategoryScreen } from "../screens/CreateNewCategoryScreen";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="CreateNewCategory" component={CreateNewCategoryScreen} />
    </Stack.Navigator>
  );
}
