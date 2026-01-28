import { View } from "react-native";
import { ScreenLayout } from "../layouts/ScreenLayout";
import { CreateNewCategoryHeader } from "../components/Headers/CreateNewCategoryHeader";

export function CreateNewCategoryScreen() {
    return (
        <ScreenLayout header={<CreateNewCategoryHeader />}>
            <View>

            </View>
        </ScreenLayout>
    )
}