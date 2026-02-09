import { Text, TouchableOpacity, View } from "react-native";

interface CategoriesListProps {
  list: boolean;
}

export default function CategoriesList({ list }: CategoriesListProps) {
  return (
    <>
      {list ? (
        <View className="w-full flex-col gap-2">
          <TouchableOpacity
            style={{ backgroundColor: "red" }}
            className="p-3 rounded-full flex-row items-center justify-start gap-2"
          >
            <View
              style={{ backgroundColor: "white" }}
              className="w-6 h-6"
            ></View>
            <Text style={{ color: "white" }} className="text-base font-medium">
              Категория
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="w-full flex-row flex-wrap gap-2">
          <TouchableOpacity
            style={{ backgroundColor: "red" }}
            className="p-3 rounded-full"
          >
            <View
              style={{ backgroundColor: "white" }}
              className="w-10 h-10"
            ></View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
